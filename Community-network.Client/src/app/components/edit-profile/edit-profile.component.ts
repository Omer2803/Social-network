import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Profile } from 'src/app/models/profile';
import { ActivatedRoute, Router } from '@angular/router';
import { IdentityService } from 'src/app/services/identity.service';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  sub: any;
  profile: Profile;
  returnUrl: string;
  currentProfile: BehaviorSubject<Profile>


  constructor(private authenticationService: AuthenticationService, private identityService: IdentityService, private router: Router, private route: ActivatedRoute) {
    this.authenticationService.currentProfile.subscribe(user => {
      this.profile = user;
    });
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  saveDetails(profileToEdit: any) {
    this.identityService.edit(profileToEdit).subscribe(profile => {
      this.profile = profile;
      alert("Successfull updated");
      this.currentProfile = new BehaviorSubject<Profile>(this.profile);
      this.authenticationService.currentProfile = this.currentProfile.asObservable();
      this.router.navigate([this.returnUrl]);
    }, error => {
      alert('You are not authorized, please login again');
      this.authenticationService.logout();
      this.router.navigate(['/login']);
    })
  }

}
