import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Profile } from '../models/profile';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {

  identityUrl = "http://localhost:54056/api/Identity";

  constructor(private httpClient: HttpClient) { }


  edit(profile: any): Observable<Profile> {
    let authHeaders:string[] = [profile.email, localStorage.getItem('token')];
    let headers:HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type','application/json');
    headers = headers.append('TokenUser',authHeaders);
    return this.httpClient.put(this.identityUrl + '/Edit', profile,{headers:headers});
  }
}
