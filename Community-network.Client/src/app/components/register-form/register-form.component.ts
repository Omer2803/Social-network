import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MustMatch } from 'src/app/helpers/must-match.validator';
import { Profile } from 'src/app/models/profile';


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;
  @Input() profile: Profile = {};
  @Output() onSave: EventEmitter<any> = new EventEmitter();


  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService) {
    authenticationService.currentProfile.subscribe(user => {
      if (user) {
        this.profile = user;
      }
    })
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: new FormControl(this.profile.Email, Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      firstName: [this.profile.FirstName, Validators.required],
      lastName: [this.profile.LastName, Validators.required],
      username: [this.profile.UserName, Validators.required],
      password: [this.profile.Password, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [this.profile.Password, Validators.required],
      birthdate: [this.profile.BirthDate, Validators.required],
    },
      {
        validator: MustMatch('password', 'confirmPassword')
      });
      debugger;
    if (this.profile.Email) {
      this.registerForm.controls.email.disable();
    }

  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    if (this.profile.Email) {
      this.registerForm.value.email = this.profile.Email;
      this.onSave.emit(this.registerForm.value);
      return;
    }
    this.loading = true;
    this.authenticationService.register(this.registerForm.value).subscribe(profile => {
      debugger;
      if (profile != null) {
        this.profile = profile;
        this.router.navigate(['/login']);
      }
    });
  }

}
