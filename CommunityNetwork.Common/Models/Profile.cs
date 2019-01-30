
using Amazon.DynamoDBv2.DataModel;
using CommunityNetwork.Common.Inerfaces;
using CommunityNetwork.Common.Models;
using System;

namespace CommunityNetwork.Common
{
    public class Profile : MNode
    {
        [DynamoDBHashKey]
        public string Email { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string WorkPlace { get; set; }
        public DateTime BirthDate { get; set; }
        public string Address { get; set; }
        public bool IsFollow { get; set; }
        public string Token { get; set; }
    }
}
