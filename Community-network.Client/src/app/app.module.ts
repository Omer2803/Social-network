import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SocialLoginModule, AuthServiceConfig, LoginOpt } from "angularx-social-login";
import { FacebookLoginProvider } from "angularx-social-login";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFacebookComponent } from './components/login-facebook/login-facebook.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { HttpClientModule } from '@angular/common/http';
import { routing } from './app-routing.module';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { FriendsComponent } from './components/friends/friends.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { SearchUserComponent } from './components/search-user/search-user.component';
import { PostComponent } from './components/post/post.component';
import { NotificationComponent } from './components/notification/notification.component';




const fbLoginOptions: LoginOpt = {
  scope: 'pages_messaging,pages_messaging_subscriptions,email,pages_show_list,manage_pages',
  return_scopes: true,
  enable_profile_selector: true
};

let config = new AuthServiceConfig([{
  id: FacebookLoginProvider.PROVIDER_ID,
  provider: new FacebookLoginProvider("353443318784023")
}]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginFacebookComponent,
    LoginFormComponent,
    RegisterFormComponent,
    HomePageComponent,
    ProfileComponent,
    EditProfileComponent,
    FriendsComponent,
    UserInfoComponent,
    SearchUserComponent,
    PostComponent,
    NotificationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    routing,

    
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig,
      
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
