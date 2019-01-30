
﻿using CommunityNetwork.Common;

using CommunityNetwork.Common.Inerfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AuthenticationService.Controllers
{
    [RoutePrefix("api/Authentication")]
    public class AuthenticationController : ApiController
    {
        private readonly IProfileService _profileService;

        public AuthenticationController(IProfileService profileService)
        {
            this._profileService = profileService;
        }

        [HttpGet]
        [Route("Login")] 
        public IHttpActionResult Login(string email, string password)
        {
            try
            {
                var profileConnected = _profileService.Login(email, password);
                if (profileConnected !=null)
                {
                    var token = Request.Headers.GetValues("token");
                    _profileService.GenerateToken(profileConnected.Email, token.ElementAt(0));
                }
             
                return Ok(profileConnected);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("LoginWithFaceBook")] 
        public IHttpActionResult LoginWithFaceBook([FromBody]Profile profile)
        {
            try
            {

                var profileConnected = _profileService.LoginWithFaceBook(profile);
                return Ok(profileConnected);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("CheckValidToken")]
        public HttpStatusCode CheckValidToken(string email,string token)
        {

            if (_profileService.CheckValidationToken(email, token))
                return HttpStatusCode.OK;
            else return HttpStatusCode.Unauthorized;
        
        }


        [HttpPost]
        [Route("Register")]
        public IHttpActionResult Register([FromBody]Profile profile)
        {
            try
            {
                var profileRegistered = _profileService.Register(profile);
             
                return Ok(profileRegistered);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
