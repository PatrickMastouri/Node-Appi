import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {PostService} from '../../../../Domain/Services/post.service';
import {Posts} from '../../../../Domain/Model/posts';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit , OnDestroy{
  @Input() id:number;
  AddPostForm: FormGroup ;
  submitted = false;
  unsibscribe = new Subject<void>();

  text1: string = '<div>Hello World!</div><div>PrimeNG <b>Editor</b> Rocks</div><div><br></div>';

  text2: string;

  constructor(private postService: PostService,private route: ActivatedRoute, private router: Router) {
    this.AddPostForm = new FormGroup({
      title : new FormControl('', [Validators.required]),
      content : new FormControl('', [Validators.required]),
      tags : new FormControl('', [Validators.required]),
    });

  }

  ngOnInit(): void {

  }
  ngOnChanges():void {

    console.log("changes : "+this.id);

  }
  submitForm(): void{
    const posts  = new Posts();


    posts.title = this.AddPostForm.controls.title.value;
    posts.content = this.AddPostForm.controls.content.value;
    posts.tags = this.AddPostForm.controls.tags.value;
    posts.UserId = localStorage.getItem('id');
    posts.forumId = this.route.snapshot.paramMap.get('subject');
    posts.dateCreated = new Date().toDateString();
    posts.dateUpdated = new Date().toDateString();
    this.postService.NewPost(posts).pipe(takeUntil(this.unsibscribe)).subscribe(
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
