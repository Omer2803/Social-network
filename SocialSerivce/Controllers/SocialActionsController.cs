
using CommunityNetWork.Common.Enums;
using Social.BL.Interfaces;
using Social.BL.Models;
using System;
using System.Web.Http;
using CommunityNetwork.Common;
using Authentication.BL;
using System.Net.Http;
using Newtonsoft.Json;
using System.Text;
using CommunityNetwork.Common.Models;
using Social.BL;

namespace SocialSerivce.Controllers
{
    [RoutePrefix("api/SocialActions")]
    public class SocialActionsController : ApiController
    {
        ICommunication _com;
        IRepository _repos;
        private AmazonS3Uploader amazonS3Uploader;
        private const string BUCKETURL = "https://s3.eu-central-1.amazonaws.com/pictures-bucket32/";
        const string URL = "http://localhost:63037/api/Notification/SendNotification";


        public SocialActionsController(ICommunication com, IRepository repos)
        {
            _com = com;
            _repos = repos;
            amazonS3Uploader = new AmazonS3Uploader();
        }



        [HttpPost]
        [Route("CreatePost")]
        public IHttpActionResult CreatePost([FromBody]Post post)
        {
            try
            {
                if (post.ImageSourcePath != null)
                {
                    string keyImage = amazonS3Uploader.UploadFile(post.ImageSourcePath);
                    post.ImageSourcePath = BUCKETURL + keyImage;
                }
                _repos.Add(post);
                SocialAction profileToPost = new SocialAction()
                {
                    FromId = post.PublisherId,
                    ToId = post.Id,
                    linkage = Linkage.Publish.ToString(),
                    Switcher = true
                };
                _com.Link<Post, Profile>(profileToPost.ToId, profileToPost.FromId, Linkage.Publish);
                if (post.TagUserID != null)
                {
                    SocialAction postToProfile = new SocialAction()
                    {
                        FromId = post.Id,
                        ToId = post.TagUserID,
                        linkage = Linkage.Mention.ToString(),
                        Switcher = true
                    };
                    _com.Link<Profile, Post>(postToProfile.ToId, postToProfile.FromId, Linkage.Mention);
                    Notify(post.PublisherId, "Mention", post.Id, post.TagUserID);
                }
                return Ok();


            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }



        [HttpGet]
        [Route("GetComments")]
        public IHttpActionResult GetComments(string postId)
        {
            try
            {
                var comments = _com.GetNodeLinkers<Post, Comment>(postId, Linkage.Comment);
                return Ok(comments);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        [Route("GetPostById")]
        public IHttpActionResult GetPostById(string postId)
        {
            try
            {
                var relevantPost = _repos.Get<Post>(postId);
                return Ok(relevantPost);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }



        [HttpPost]
        [Route("AddComment")]
        public IHttpActionResult AddComment([FromBody]Comment comment)
        {
            try
            {
                _repos.Add(comment);
                _com.Link<Post, Comment>(comment.PostId, comment.Id, Linkage.Comment);
                _com.Link<Comment, Profile>(comment.Id, comment.PublisherId, Linkage.Publish);
                Notify(comment.PublisherId, "Comment", comment.PostId, comment.PublisherPostId);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        private void Notify(string actorId,string linkage,string objectId,string toId)
        {
            using (var httpClient = new HttpClient())
            {
                NotificationModel notification = new NotificationModel()
                {
                    ActorId = actorId,
                    linkage = linkage,
                    ObjectId = objectId,
                    ToId = toId
                };
                var content = new StringContent(JsonConvert.SerializeObject(notification), Encoding.UTF8, "application/json");
                var response = httpClient.PostAsync(URL, content).Result;
                if (!response.IsSuccessStatusCode)
                    throw new Exception("Xmmp failed connection");
            }
        }

        [HttpPost]
        [Route("BlockUser")]
        public IHttpActionResult BlockUser([FromBody]SocialAction socialAction)
        {
            try
            {
                bool linked = socialAction.Switcher;
                if (linked)
                {
                    _com.Link<Profile, Profile>(socialAction.ToId, socialAction.FromId, Linkage.Block);
                    bool isLinked = _com.IsLinker<Profile, Profile>(socialAction.ToId, socialAction.FromId, Linkage.Follow);
                    if (isLinked)
                        _com.UnLink<Profile, Profile>(socialAction.ToId, socialAction.FromId, Linkage.Follow);
                    bool isLinker = _com.IsLinker<Profile, Profile>(socialAction.FromId, socialAction.ToId, Linkage.Follow);
                    if (isLinker)
                        _com.UnLink<Profile, Profile>(socialAction.FromId, socialAction.ToId, Linkage.Follow);
                }
                else
                {
                    _com.UnLink<Profile, Profile>(socialAction.ToId, socialAction.FromId, Linkage.Block);
                }
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }


        [HttpPost]
        [Route("SWLinkProfiles")]
        public IHttpActionResult SWLinkProfiles([FromBody]SocialAction socialAction)
        {

            try
            {
                if (socialAction.Switcher)
                {
                    _com.Link<Profile, Profile>(socialAction.ToId, socialAction.FromId, Linkage.Follow);
                    Notify(socialAction.FromId, "Follow", null, socialAction.ToId);
                }
                else
                    _com.UnLink<Profile, Profile>(socialAction.ToId, socialAction.FromId, Linkage.Follow);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        [Route("DoLike")]
        public IHttpActionResult DoLike([FromBody]SocialAction socialAction)
        {
            string fromId = socialAction.FromId;
            string toId = socialAction.ToId;
            Linkage linkage = (Linkage)Enum.Parse(typeof(Linkage), socialAction.linkage);
            bool toLink = socialAction.Switcher;
            if (socialAction.Switcher)
            {
                _com.Link<Post, Profile>(socialAction.ToId, socialAction.FromId, Linkage.Like);
                Notify(socialAction.FromId, "Like", socialAction.ToId, socialAction.PublisherPostId);
            }

            else
            {
                bool a = _com.IsLinker<Post, Profile>(toId, fromId, Linkage.Like);
                _com.UnLink<Post, Profile>(toId, fromId, Linkage.Like);
            }
            return Ok(linkage + "s");
        }

  

    }
}
