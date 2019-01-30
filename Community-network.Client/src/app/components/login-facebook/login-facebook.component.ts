import { Component, OnInit } from '@angular/core';
import { AuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider } from "angularx-social-login";
import { Profile } from 'src/app/models/profile';

@Component({
  selector: 'app-login-facebook',
  templateUrl: './login-facebook.component.html',
  styleUrls: ['./login-facebook.component.css']
})
export class LoginFacebookComponent implements OnInit {


  private user: SocialUser;
  private loggedIn: boolean;
  profile:Profile

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  signInWithFacebook(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.authService.authState.subscribe((user) => {
      this.profile.UserName = user.name;
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

  signOut(): void {
    debugger;
    this.authService.signOut().then(user => {
      this.user = user;
      console.log(this.user);
    })
  }

}
