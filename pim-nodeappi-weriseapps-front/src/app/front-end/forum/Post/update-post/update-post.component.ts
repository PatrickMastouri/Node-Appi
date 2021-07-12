import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PostService} from '../../../../Domain/Services/post.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {Posts} from '../../../../Domain/Model/posts';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css']
})
export class UpdatePostComponent implements OnInit {
  UpdatePost: FormGroup ;
  submitted = false;
  post:  Posts;
  unsibscribe = new Subject<void>();

  constructor(private postService: PostService,private route: ActivatedRoute, private router: Router)
  { this.UpdatePost = new FormGroup({
    title : new FormControl('', [Validators.required]),
    content : new FormControl('', [Validators.required]),
    tags : new FormControl('', [Validators.required]),
  }); }

  ngOnInit() {
    this.getPostById(this.route.snapshot.params.id);
  }


  getPostById(id): void
  {
    this.postService.getPostById(id).subscribe(
      (data)=>{
        this.post = data.data;
        console.log(this.post);
      }
    )
    console.log(this.post);
  }


  submitForm(): void{
    const posts  = new Posts();


    posts.title = this.UpdatePost.controls.title.value;
    posts.content = this.UpdatePost.controls.content.value;
    posts.tags = this.UpdatePost.controls.tags.value;
    posts.UserId = localStorage.getItem('id');
    posts.forumId = this.route.snapshot.paramMap.get('subject');
    posts.dateCreated = new Date().toDateString();
    posts.dateUpdated = new Date().toDateString();
    this.postService.updatePost(this.route.snapshot.params.id,posts).pipe(takeUntil(this.unsibscribe)).subscribe(
      (rep) => {
        console.log(rep);
        this.router.navigate(['/front/Forum/posts/',this.route.snapshot.paramMap.get('subject')]);
      }, (error) => {
        console.log(error);
      }
    );

  }

  ngOnDestroy(): void {
    this.unsibscribe.next();
    this.unsibscribe.complete();
  }


}
