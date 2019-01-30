import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Profile } from 'src/app/models/profile';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialService } from 'src/app/services/social.service';
import { SocialAction } from 'src/app/models/socialAction';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

 
  profiles: Profile[] = [];
  userName: string;
  action: SocialAction = {}
  @Input() isYou:boolean
  @Input() isFollow: boolean;
  @Input() isBlock: boolean;
  @Input() contact: Profile
  constructor(private socialService: SocialService,
     private authenticationService: AuthenticationService,
     private router:Router) { }

  ngOnInit() {

  }

  follow(id: string) {
    this.authenticationService.currentProfile.subscribe(x => {
      var fromId = x.Id;
      this.action = {
        ToId: id,
        FromId: fromId,
        linkage: 'Follow',
        Switcher: !this.isFollow
      }
    });
    this.socialService.follow(this.action).subscribe(res => {
      location.reload();
    })
  }

  block(id: string) {
    this.authenticationService.currentProfile.subscribe(x => {
      var fromId = x.Id;
      this.action = {
        ToId: id,
        FromId: fromId,
        linkage: 'Block',
        Switcher: !this.isBlock
      }
    });
    this.socialService.block(this.action).subscribe(res => {
      alert('block');
      location.reload();
    })
  }

  navToUserInfo(id:string){
    debugger;
    this.router.navigate(['/userinfo', {request:id}]);

  }

 
}
