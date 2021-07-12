import {Component, Input, OnInit} from '@angular/core';
import {PostService} from '../../Domain/Services/post.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Posts} from '../../Domain/Model/posts';

@Component({
  selector: 'app-posts-back',
  templateUrl: './posts-back.component.html',
  styleUrls: ['./posts-back.component.css']
})
export class PostsBackComponent implements OnInit {
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
    this.getPosts();


  }

  getPosts(): void {
    this.postService.getAllPosts()
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

}
