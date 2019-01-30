import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class NotificationsService {

  userNotify: any
  private persistenceUrl = "http://localhost:52225/api/Persistence";

  constructor(private http: HttpClient) { }

  notify(notification) {
    this.getProfileById(notification.ActorId).subscribe(users => {
      debugger;
      this.userNotify = users[0];
      if (notification.linkage == 'Follow') {
        alert(this.userNotify.UserName + ' ' + 'started following you');
      }
      else if (notification.linkage == 'Comment') {
        alert(this.userNotify.UserName + ' ' + 'commented on your post');
      }
      else if (notification.linkage == 'Like') {
        alert(this.userNotify.UserName + ' ' + 'liked your post');
      }
      else if (notification.linkage == 'Mention') {
        alert(this.userNotify.UserName + ' ' + 'mention you in his post');
      }
    });

  }
  getProfileById(id: string) {
    return this.http.get(this.persistenceUrl + '/GetProfileByUserId?userId=' + id);
  }
}
