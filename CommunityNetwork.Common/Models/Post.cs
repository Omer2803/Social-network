using CommunityNetwork.Common.Enums;
using CommunityNetwork.Common.Inerfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CommunityNetwork.Common.Models
{
    public class Post: MNode,IPost
    {
        public VisibilityPermission VisibilityPermission { get; set; }
        public string ImageSourcePath { get; set; }
        public int Likes { get ; set ; }
        public List<Profile> Likers { get; set; }
        public string Content { get; set; }
        public string PublisherId { get; set; }
        public string Publisher { get; set; }
        public bool IsLiked { get; set; }
        public string TagUserID { get; set; }
    }
}
