import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Comments} from '../../../../Domain/Model/comments';
import {RepliesService} from '../../../../Domain/Services/replies.service';
import {takeUntil} from 'rxjs/operators';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {ConfirmationService} from 'primeng/api';
import {Message} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import {Posts} from '../../../../Domain/Model/posts';
import {PostService} from '../../../../Domain/Services/post.service';

@Component({
  selector: 'app-replies',
  templateUrl: './replies.component.html',
  styleUrls: ['./replies.component.css'] ,
  providers: [ConfirmationService]})
export class RepliesComponent implements OnInit {
  owner = false;
  Nbr = 0;
  post: Posts ;
  commentsList: Comments [] = [];
  id: number;
  res: string;
  AddCommentsForm: FormGroup ;
  submitted = false;
  msgs: Message[] = [];
  unsibscribe = new Subject<void>();
  constructor(private confirmationService: ConfirmationService, private primengConfig: PrimeNGConfig,
              private repliesService: RepliesService, private route: ActivatedRoute, private postService: PostService) { }

  Utilisateur = localStorage.getItem('id');

  ngOnInit(): void {
    this.getPostById(this.route.snapshot.paramMap.get('id'));
    this.getCommentsByUSer(this.route.snapshot.paramMap.get('id'));
    console.log('id post=' + this.route.snapshot.paramMap.get('id'));
    this.AddCommentsForm = new FormGroup({
      content : new FormControl('', [Validators.required]),

    });
    this.GetCommentsN(this.route.snapshot.paramMap.get('id'));
  }

  getCommentsByUSer(id): void {
    this.repliesService.getCommentsByUSer(id)
      .subscribe(
        data => {
         this.commentsList = data.data.map( x => {
           console.log(x._id, x.UserId);
           if (x.UserId === this.Utilisateur){

             return {...x, owner: true, id: x._id};

           }
           else {
             return {...x, owner: false, id: x._id};
           }
         });

         console.log(this.commentsList);
        },
        error => {
          console.log(error);
        });
  }

  getPostById(id): void {
    this.postService.getPostById(id).subscribe(
      (data) => {
        this.post = data.data;
        console.log(this.post);
      }
    );
    console.log(this.post);
  }


  submitForm(): void{
    const tdpost = this.route.snapshot.paramMap.get('id');
    const cmnts  = new Comments();
    cmnts.UserId = localStorage.getItem('id');
    cmnts.content = this.AddCommentsForm.controls.content.value;
    const DateCrt = Date.now();
    cmnts.createdAt = new Date(DateCrt);
    cmnts.updatedAt = new Date(DateCrt);
    cmnts.PostId = tdpost;
    this.repliesService.AddComment(cmnts).pipe(takeUntil(this.unsibscribe)).subscribe(
      (rep) => {

        this.commentsList = rep.data;
        window.location.reload();


      }, (error) => {
        console.log(error);
      }
    );
  }


  deleteComment(id: string): void {
    this.repliesService.deleteComment(id).subscribe(
      response => {
        console.log(response);
        window.location.reload();
        console.log(id);
      },
      error => {
        console.log(error);
      });
  }


  GetCommentsN(id: string): void{
    this.postService.getCommentsNumber(id).subscribe(
      data => {
        this.Nbr = data.data;
        console.log(this.Nbr);
      },
      error => {
        console.log(error);
      }); }




  ngOnDestroy(): void {
    this.unsibscribe.next();
    this.unsibscribe.complete();
  }

}
