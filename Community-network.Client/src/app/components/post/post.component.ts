import { Component, OnInit, Input } from '@angular/core';
import { SocialService } from 'src/app/services/social.service';
import { Profile } from 'selenium-webdriver/firefox';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post: any
  @Input() isLiked: boolean
  comments: any;
  action: any
  currentUser: any;
  postId:string

  constructor(private socialService: SocialService,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute) {
    this.authenticationService.currentProfile.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params:any) => {
      if(params.params.postId){
        this.postId = params.get('postId');
        this.socialService.getPostById(this.postId).subscribe(post=>{
          this.post = post;
        })
      }
    });
  }

  getComments(postId: string) {
    this.socialService.getComments(postId).subscribe(comments => {
      this.comments = comments;
    })
  }

  like(id: string, publisherPostId: string) {
    this.action = {
      ToId: id,
      FromId: this.currentUser.Id,
      linkage: 'Like',
      Switcher: !this.post.IsLiked,
      PublisherPostId: publisherPostId
    }
    this.socialService.like(this.action).subscribe(res => {
      location.reload();
    })
  }

  comment(content: string, postId: string, publisherPostId: string) {
    var comment = {
      PublisherId: this.currentUser.Id,
      Content: content,
      PostId: postId,
      Publisher: this.currentUser.UserName,
      PublisherPostId: publisherPostId
    }
    this.socialService.comment(comment).subscribe(res => {
      alert('comment succesfully');
    }, err => console.log(err));
  }
}
