import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { AppComponent } from './app.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { FriendsComponent } from './components/friends/friends.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { SearchUserComponent } from './components/search-user/search-user.component';
import { PostComponent } from './components/post/post.component';

const routes: Routes = [
  { path: '', component: HomePageComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginFormComponent },
  { path: 'register', component: RegisterFormComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'edit', component: EditProfileComponent },
  { path: 'friends', component: FriendsComponent },
  { path: 'search', component: SearchUserComponent },
  { path: 'userinfo', component: UserInfoComponent },
  { path: 'post', component: PostComponent },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
export const routing = RouterModule.forRoot(routes);
