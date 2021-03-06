﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CommunityNetwork.Common.Inerfaces
{
    public interface IProfileService
    {
        Profile Login(string email, string password);
        bool CheckValidationToken(string email,string token);
        Profile Register(Profile profile);
        Profile LoginWithFaceBook(Profile profile);
        void GenerateToken(string email, string token);
    }
}
