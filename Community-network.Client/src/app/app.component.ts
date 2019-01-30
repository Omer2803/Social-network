import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { Profile } from './models/profile';
import { Router } from '@angular/router';
import { BoshClient } from "xmpp-bosh-client/browser";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentProfile: Profile
  url: string = 'http://localhost:5280/http-bind/';
  client: BoshClient
  
  constructor(private router: Router, private authenticationService: AuthenticationService) {
    this.authenticationService.currentProfile.subscribe(x => this.currentProfile = x);
    if (!this.currentProfile) {
      this.router.navigate(['/login']);
    }
  }


  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  navToProfile(userName: string) {
    this.router.navigate(['/search', { userName: userName }]);
  }

  navToFriends(request: string) {
    this.router.navigate(['/friends', { request: request }]);
  }

}
