import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Profile } from '../models/profile';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Guid } from "guid-typescript";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<Profile>;
  public currentProfile: Observable<Profile>;
  loggedIn: boolean = false;

  authUrl = "http://localhost:60562/api/Authentication";

  constructor(private httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Profile>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentProfile = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Profile {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    let headers:HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type','application/json');
    localStorage.setItem('token',Guid.create().toString());
    headers = headers.append('token',localStorage.getItem('token'));
    return this.httpClient.get<any>(this.authUrl + '/Login?email=' + email + '&password=' + password,{headers:headers}).pipe(
      map(profile => {
        if (profile) {
          localStorage.setItem('currentUser', JSON.stringify(profile));
          this.currentUserSubject.next(profile);
        }
        return profile;
      }));
  }

  loginFB(profile: Profile) {
    return this.httpClient.post<any>(this.authUrl + '/LoginWithFaceBook', profile).pipe(
      map(profile => {
        if (profile) {
          localStorage.setItem('currentUser', JSON.stringify(profile));
          this.currentUserSubject.next(profile);
        }
        return profile;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);

  }

  register(profile: any): Observable<Profile> {
    return this.httpClient.post<any>(this.authUrl + '/Register', profile);
  }



  checkValidToken(email: string): Observable<any> {
    return this.httpClient.get(this.authUrl + '/CheckValidToken?email=' + email);
  }
}
