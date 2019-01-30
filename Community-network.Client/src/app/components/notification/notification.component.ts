import { Component, OnInit, Input } from '@angular/core';
import { SocialService } from 'src/app/services/social.service';
import { Profile } from 'src/app/models/profile';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  @Input() notification: any
  profile:Profile
  userName:string
  followNotify:boolean
  commentNotify:boolean
  mentionNotify:boolean
  likeNotify:boolean

  constructor(private socialService: SocialService) { }

  ngOnInit() {
    this.socialService.getProfileById(this.notification.ActorId).subscribe((profiles: any) => {
      debugger;
      this.profile = profiles[0];
      if (this.notification.linkage == 'Follow') {
        this.followNotify=true;
      }
      else if (this.notification.linkage == 'Comment') {
        this.commentNotify = true;
      }
      else if (this.notification.linkage == 'Like') {
        this.likeNotify =true;
      }
      else if (this.notification.linkage == 'Mention') {
        this.mentionNotify = true;
      }
    });

  }

}
