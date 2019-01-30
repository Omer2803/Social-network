import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from 'selenium-webdriver/firefox';
import { SocialAction } from '../models/socialAction';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SocialService {


  private persistenceUrl = "http://localhost:52225/api/Persistence";
  private socialActionsUrl = "http://localhost:52225/api/SocialActions";
  private socialCommunityUrl = "http://localhost:52225/api/SocialCommunity";

  constructor(private http: HttpClient) { }

  getProfile(userName: string, currentUserId: string): any {
    return this.http.get(this.persistenceUrl + '/GetProfileByUserName?userName=' + userName + '&currentUserId=' + currentUserId);
  }

  getProfileById(id: string) {
    return this.http.get(this.persistenceUrl + '/GetProfileByUserId?userId=' + id);
  }

  follow(follow: SocialAction) {
    return this.http.post(this.socialActionsUrl + '/SWLinkProfiles', follow);
  }

  getFollowers(id: string) {
    return this.http.get(this.socialCommunityUrl + '/GetFollowers?userId=' + id);
  }

  getFollowings(id: string) {
    return this.http.get(this.socialCommunityUrl + '/GetFollowings?userId=' + id);
  }

  getBlockedUsers(id: string) {
    return this.http.get(this.socialCommunityUrl + '/GetBlockedUsers?userId=' + id);
  }

  createPost(post: any) {
    debugger;
    return this.http.post(this.socialActionsUrl + '/CreatePost', post);
  }

  getFeed(id: string): any {
    return this.http.get(this.socialCommunityUrl + '/GetPostsByFollowed?followerId=' + id);
  }

  getPosts(id: string): any {
    return this.http.get(this.socialCommunityUrl + '/GetPosts?userId=' + id);
  }

  block(block: SocialAction) {
    return this.http.post(this.socialActionsUrl + '/BlockUser', block);
  }

  like(like: SocialAction) {
    return this.http.post(this.socialActionsUrl + '/DoLike', like);
  }

  comment(comment: any) {
    return this.http.post(this.socialActionsUrl + '/AddComment', comment);
  }

  getComments(postId: string) {
    return this.http.get(this.socialActionsUrl + '/GetComments?postId=' + postId);
  }
  getPostById(postId: string) {
    return this.http.get(this.socialActionsUrl + '/GetPostById?postId='+ postId);
  }
}
