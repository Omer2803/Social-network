using CommunityNetwork.Common.Models;
using Newtonsoft.Json;
using NotificationsService.XMPP;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace NotificationsService.Controllers
{
    [RoutePrefix("api/Notification")]
    public class NotificationController : ApiController
    {
        readonly XMPPConnector xMPP;

        public NotificationController()
        {
            xMPP = XMPPConnector.Init;
        }

        [HttpGet]
        [Route("Register")]
        public async Task<IHttpActionResult> Register(string profileId,string password)
        {
            try
            {
                await xMPP.Register(profileId, password);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("SendNotification")]
        public async Task<IHttpActionResult> SendNotification([FromBody]NotificationModel notification)
        {
            try
            {
                await xMPP.SendPrivateMessage(JsonConvert.SerializeObject(notification), notification.ToId);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


    }
}
