
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Linq;
using CommunityNetWork.Dal.Interfaces;
using System;
using System.Net.Http;
using System.Net;
using Newtonsoft.Json;

namespace Authentication.BL
{
    public class AuthorizeValidator : AuthorizeAttribute
    {

        protected override bool IsAuthorized(HttpActionContext actionContext)
        {
            var headers = actionContext.Request.Headers;
            var tokenUsers = headers.GetValues("TokenUser");
            var tokenUser = tokenUsers.First().Split(',');
            string email = tokenUser.ElementAt(0);
            string token = tokenUser.ElementAt(1);

            using (var httpClient = new HttpClient())
            {
                var response = httpClient.GetAsync($"http://localhost:60562/api/Authentication/CheckValidToken?email={email}&token={token}").Result;
                var jsonStatusCode = JsonConvert.DeserializeObject<HttpStatusCode>(response.Content.ReadAsStringAsync().Result);
                return jsonStatusCode == HttpStatusCode.OK ? true : false;
            }
        }
    }
}
