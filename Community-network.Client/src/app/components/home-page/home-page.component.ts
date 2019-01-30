import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Profile } from 'src/app/models/profile';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SocialService } from 'src/app/services/social.service';
import { SocialAction } from 'src/app/models/socialAction';
import { read } from 'fs';
import { BoshClient, $build } from "xmpp-bosh-client/browser";
import { NotificationsService } from 'src/app/services/notifications.service';




@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  currentUser: Profile;
  currentUserSubscription: Subscription;
  postForm: any;
  submitted = false;
  posts: any;
  action: SocialAction
  fileSelected: File;
  file: any;
  comments: any;
  postContent: string
  followings: any
  isTag: boolean
  selectedValue: any
  tagId: string
  filePath: any
  username: string;
  password: string;
  url: string = 'http://localhost:5280/http-bind/';
  notifications: any[] = []




  constructor(private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private socialService: SocialService,
    private notificationService: NotificationsService) {
    this.currentUserSubscription = this.authenticationService.currentProfile.subscribe(user => {
      this.currentUser = user;
    });

  }

  ngOnInit() {
    this.postForm = this.formBuilder.group({
      post: ['', Validators.required]
    });
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.socialService.getFeed(this.currentUser.Id).subscribe(posts => {
      this.posts = posts;
    })
    this.username = this.currentUser.Id + '@DESKTOP-5K04ECP';
    this.password = this.currentUser.Password;
    var client = new BoshClient(this.username, this.password, this.url);
    client.connect();
    client.on("online", () => {
      console.log("Connected successfully");
      client.send($build("presence", null, $build('Show', null, 'Chat')))
    });
    client.on("error", (e) => {
      console.log("Error event");
      console.log(e);
    });
    client.on("stanza", (stanza: any) => {
      if (stanza.name == 'message') {
        debugger;
        var notification = JSON.parse(stanza.children[1].children);
        this.notifications.push(notification);
      }
    });
  }

  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
  }



  onPost() {
    this.submitted = true;
    if (this.postForm.invalid) {
      return;
    }
    var newPost = {
      PublisherId: this.currentUser.Id,
      Content: this.postForm.value.post,
      Publisher: this.currentUser.UserName,
      TagUserID: this.tagId,
      ImageSourcePath: this.filePath
    }
    this.socialService.createPost(newPost).subscribe(res => {
      alert('Succesfully posted');
    }, error => alert(error));

  }




  onFileSelected(event) {
    this.fileSelected = <File>event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.fileSelected);
    reader.onloadend = (e) => {
      this.filePath = reader.result;
    }
  }



  showSelect() {
    if (this.postForm.value.post.endsWith('@')) {
      this.socialService.getFollowings(this.currentUser.Id).subscribe(followings => {
        this.followings = followings;
        this.isTag = true;
      })
    }
  }

  tagUser(userName: string, id: string) {
    if (userName) {
      this.postForm.get('post').setValue('@' + userName);
      this.tagId = this.followings.filter(x => x.UserName === userName)[0].Id;
      this.isTag = false;
    }

  }



}
