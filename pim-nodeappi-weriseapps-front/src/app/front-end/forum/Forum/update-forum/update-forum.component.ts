import { Component, OnInit } from '@angular/core';
import {ForumService} from '../../../../Domain/Services/forum.service';
import {Forum} from '../../../../Domain/Model/forum';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-update-forum',
  templateUrl: './update-forum.component.html',
  styleUrls: ['./update-forum.component.css']
})
export class UpdateForumComponent implements OnInit {
  forum: Forum;
  unsibscribe = new Subject<void>();
  forumsList: Forum;
  f = new Forum ();
  updateForumForm: FormGroup;

  subject: string;
  description: string;
  tags: string;


  constructor(private forumService: ForumService, private router: Router, private route: ActivatedRoute) {
    this.updateForumForm = new FormGroup({
      subject : new FormControl('', [Validators.required]),
      description : new FormControl('', [Validators.required]),
      tags : new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getForumById(this.route.snapshot.params.id);
  }

  getForumById(id): void
  {
    this.forumService.getForumById(id).subscribe(
      (data) => {
        this.forumsList = data.data;
        console.log(this.forumsList);
      }
    );
    console.log(this.forumsList);
  }




  submitForm(): void{
    const forum  = new Forum();
    localStorage.getItem('id');
    forum.subject = this.updateForumForm.controls.subject.value;
    forum.description = this.updateForumForm.controls.description.value;
    forum.tag = this.updateForumForm.controls.tags.value;
    forum.UserId = localStorage.getItem('id');
    console.log(forum);
    this.forumService.updateForum(this.route.snapshot.params.id, forum).pipe(takeUntil(this.unsibscribe)).subscribe(
      (rep) => {
        console.log(this.route.snapshot.params.id);
        this.router.navigate(['front/Forum']);
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
