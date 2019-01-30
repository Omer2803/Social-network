import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Profile } from 'src/app/models/profile';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider } from "angularx-social-login";
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { first, map } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';



@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  @Input() profile: Profile = {};
  loginForm: FormGroup;
  submitted = false;
  private user: SocialUser;
  private loggedIn: boolean = false;
  loading = false;
  returnUrl: string;
  currentProfile: BehaviorSubject<Profile>;
  authError: boolean;

  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private authService: AuthService, private router: Router) {

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    
  }

  get f() { return this.loginForm.controls; }

  login() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.authenticationService.login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.authError = true;
          this.loading = false;
        });
  }

  loginnWithFacebook() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.authService.authState.subscribe(user => {
      this.updateSocialUserToProfile(user);
    });
    this.authenticationService.loginFB(this.profile).pipe(first()).subscribe(connected => {
      this.router.navigate([this.returnUrl]);
    });

  }

  signOut(): void {
    this.authService.signOut().then(user => {
      this.user = user;
    })
  }

  updateSocialUserToProfile(user: SocialUser) {
    if (user) {
      this.profile.UserName = user.name;
      this.profile.Email = user.email;
      this.profile.FirstName = user.firstName;
      this.profile.LastName = user.lastName;
      this.profile.Id = user.id;
    }
  }


}
