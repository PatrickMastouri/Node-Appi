import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PostService} from '../../../../Domain/Services/post.service';
import {Posts} from '../../../../Domain/Model/posts';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  @Input() post: Posts;
  owner = false;
  Posts: Posts [] = [] ;
  Nbr = 0;
  id: string;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  Utilisateur = localStorage.getItem('id');

  ngOnInit(): void {
    this.getPosts(this.route.snapshot.paramMap.get('idforum'));


  }

  getPosts(subject: string | null): void {
    this.postService.getPostsByForumSubject(subject)
      .subscribe(
        data => {
         this.Posts = data.data.map(x => {
           console.log(this.Utilisateur, x.UserId);
           if (x.UserId === this.Utilisateur){

              return {...x, owner: true, id: x._id};

            }
            else {
              return {...x, owner: false, id: x._id};
            }
          });
         console.log(this.Posts);
        },
        error => {
          console.log(error);
        });
  }

  deletePost(id: string): void {
    this.postService.delete(id).subscribe(
        response => {
          console.log(response);
          // this.router.navigate(['/posts/:subject']);
          window.location.reload();
          console.log(id);
        },
        error => {
          console.log(error);
        });
  }



  ByTag(tag: string): any{
    this.postService.getPostByTags(tag).subscribe(
      result => {
        this.Posts = result.data.map(
          x => {
            console.log(this.Utilisateur, x.UserId);
            if (x.UserId === this.Utilisateur){

              return {...x, owner: true};

            }
            else {
              return {...x, owner: false};
            }
          });
      });
  }

/*
  GetCommentsN(id: string): void{
    this.postService.getCommentsNumber(id).subscribe(
      data =>{
        this.Nbr=data.data
        console.log(this.Nbr);
    },
      error => {
        console.log(error);
      });}

 */
}
