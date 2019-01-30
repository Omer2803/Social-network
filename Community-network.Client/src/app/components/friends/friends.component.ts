import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/models/profile';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SocialService } from 'src/app/services/social.service';
import { Observable } from 'rxjs';
import { SocialAction } from 'src/app/models/socialAction';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  followers: any
  followings: any
  blockUsers: any
  userId?: string;
  action: SocialAction
  isFollow: boolean;
  isBlock: boolean;
  constructor(private authenticationService: AuthenticationService,
    private socialService: SocialService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    debugger;
    this.authenticationService.currentProfile.subscribe(profile => {
      if (profile) {
        this.userId = profile.Id;
      }
    });

    this.route.paramMap.subscribe(request => {
      var r = request.get('request');
      this.followings = null;
      this.blockUsers = null;
      this.followers = null;
      this.isBlock = false;
      this.isFollow = false;
      if (r == 'followers') {
        this.socialService.getFollowers(this.userId).subscribe((friends: Profile[]) => {
          this.followers = friends;

        })
      }
      else if (r == 'following') {
        this.socialService.getFollowings(this.userId).subscribe((followings: Profile[]) => {
          this.followings = followings;
          this.isFollow = true;
        })
      }
      else {
        this.socialService.getBlockedUsers(this.userId).subscribe((blockUsers: Profile[]) => {
          this.blockUsers = blockUsers;
          this.isBlock = true;
        })
      }
    })
  }
}
