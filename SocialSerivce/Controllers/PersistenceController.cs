using CommunityNetwork.Common;
using CommunityNetwork.Common.Models;
using CommunityNetWork.Common.Enums;
using CommunityNetWork.Dal.Interfaces;
using Newtonsoft.Json;
using Social.BL.Models;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SocialSerivce.Controllers
{
    [RoutePrefix("api/Persistence")]
    public class PersistenceController : ApiController
    {
        Repository repos;
        Communication communication;
        public PersistenceController(IGraphFactory graphFactory)
        {

            repos = new Repository(graphFactory);
            communication = new Communication(graphFactory);
        }

     


        [HttpPost]
        [Route("CreateProfile")]
        public IHttpActionResult CreateProfile([FromBody]Profile profile)
        {
            try
            {
                Profile newProfile = repos.Add(profile);

                return Ok(newProfile);

            }
            catch (Exception ex)
            {
                return BadRequest("Error occured," + ex.Message);
            }


        }

        [HttpGet]
        [Route("GetProfileByUserName")]
        public IHttpActionResult GetProfileByUserName(string userName,string currentUserId)
        {
            try
            {
                List<Profile> profiles = repos.Get<Profile>("UserName", userName);
                bool isLinked = communication.IsLinker<Profile, Profile>(profiles[0].Id, currentUserId, Linkage.Block);
                bool isLinker = communication.IsLinker<Profile, Profile>(currentUserId, profiles[0].Id, Linkage.Block);
                if(isLinked || isLinker)
                {
                    return Ok();
                }
                foreach (var p in profiles)
                {
                    var isFollow = communication.IsLinker<Profile, Profile>(p.Id, "bea32fda-be5e-4db3-b672-d7123d485a42", CommunityNetWork.Common.Enums.Linkage.Follow);
                    if (isFollow)
                    {
                        p.IsFollow = true;
                    }
                }
                return Ok(profiles);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpGet]
        [Route("GetProfileByUserId")]
        public IHttpActionResult GetProfileByUserId(string userId)
        {
            try
            {
                var profiles = repos.Get<Profile>("Id", userId);
                return Ok(profiles);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }




    }
}
