using Authentication.BL;
using CommunityNetwork.Common;
using CommunityNetwork.Common.Inerfaces;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace IdentityService.Controllers
{
  
    [RoutePrefix("api/Identity")]
    [AuthorizeValidator]
    public class IdentityController : ApiController
    {
        private readonly IIdentityService _identityService;

        public IdentityController(IIdentityService identityService)
        {
            this._identityService = identityService;
        }

        [HttpPut]
        [Route("Edit")]
        public IHttpActionResult Edit([FromBody]Profile profile)
        {
            try
            {
             
                Profile profileEdited = _identityService.Edit(profile);
                return Ok(profile);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
