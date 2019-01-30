using CommunityNetwork.Common.Inerfaces;
using System;
using System.Collections.Generic;

namespace CommunityNetwork.Common.Models
{
    public class Comment:MNode, IPost
    {
        public string Content { get; set; }
        public DateTime CommentTime { get; set; }
        public string PublisherId { get; set; }
        public int Likes { get; set ; }
        public string Publisher { get; set; }
        public string PublisherPostId { get; set; }
        public string PostId { get; set; }
    }
}
