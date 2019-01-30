using CommunityNetwork.Common;
using CommunityNetwork.Common.Models;
using Newtonsoft.Json;
using Social.BL.Interfaces;
using Social.BL.Models;
using System;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;

namespace SocialSerivce.Controllers
{
    [RoutePrefix("api/Publish")]
    public class PublishController : ApiController
    {
        private readonly IPublisher _publisher;
        const string URL = "http://localhost:63037/api/Notification/SendNotification2";

        public PublishController(IPublisher publisher)
        {
            _publisher = publisher;
        }
        
    }
}
