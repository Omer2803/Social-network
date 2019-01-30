import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocialService } from 'src/app/services/social.service';
import { Profile } from 'src/app/models/profile';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent implements OnInit {

  userName: string;
  profile: Profile
  currentProfile: any;
  isYou:boolean
  constructor(private route: ActivatedRoute,
    private socialService: SocialService,
    private authenticationService:AuthenticationService) { 

    }

  ngOnInit() {
    this.authenticationService.currentProfile.subscribe(x => this.currentProfile = x);
    this.route.paramMap.subscribe(params => {
      this.userName = params.get('userName');
    });
    this.socialService.getProfile(this.userName,this.currentProfile.Id).subscribe((profiles:Profile[])=>{
      if(profiles){
        debugger;
        this.profile = profiles[0];
        var userName = JSON.parse(localStorage.getItem('currentUser')).UserName;
        if(userName == this.profile.UserName){
          this.isYou = true;
        }
      }

    },err=>console.log(err));
  }

}
