import { Component, OnInit } from '@angular/core';
import { SocialService } from 'src/app/services/social.service';
import { Profile } from 'src/app/models/profile';
import { Router, ActivatedRoute } from '@angular/router';
import { IdentityService } from 'src/app/services/identity.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  userId: string
  searchUserId: string
  posts: any;
  followers: any
  contact: Profile
  constructor(private socialService: SocialService,
    private identityService: IdentityService,
    private router: Router,
    private route: ActivatedRoute) { 
   
    }

  ngOnInit() {
    this.route.paramMap.subscribe(request => {
      this.searchUserId = request.get('request');
    });
    this.socialService.getPosts(this.searchUserId).subscribe(posts => {
      this.posts = posts;
    });
    this.socialService.getProfileById(this.searchUserId).subscribe((profiles: Profile[]) => {
      this.contact = profiles[0];
    });
  }

  getFollowers(id: string) {
    this.socialService.getFollowers(id).subscribe((followers: Profile[]) => {
      this.followers = followers;
    })
  }

  getFollowings(id: string) {
    this.socialService.getFollowings(id).subscribe((followers: Profile[]) => {
      this.followers = followers;
    })
  }
}
