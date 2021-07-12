import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ForumService} from '../../../../Domain/Services/forum.service';
import {Forum} from '../../../../Domain/Model/forum';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-forum',
  templateUrl: './add-forum.component.html',
  styleUrls: ['./add-forum.component.css']
})

export  class AddForumComponent implements OnInit , OnDestroy{
  AddForumForm: FormGroup ;
  submitted = false;
  unsibscribe = new Subject<void>();
  @Input('id') forum_id: number;

  constructor(private forumService: ForumService,private route: Router) {


    this.AddForumForm = new FormGroup({
      subject : new FormControl('', [Validators.required]),
      description : new FormControl('', [Validators.required]),
      tags : new FormControl('', [Validators.required]),
    });
  }



  ngOnInit(): void {}

  submitForm(): void{
    const forum  = new Forum();
    localStorage.getItem('id');
    //forum.id = this.forum_id
    forum.subject = this.AddForumForm.controls.subject.value;
    forum.description = this.AddForumForm.controls.description.value;
    forum.tag = this.AddForumForm.controls.tags.value;
    forum.dateCreated = new Date().toDateString();
    forum.dateUpdated = new Date().toDateString();
    forum.UserId = localStorage.getItem('id');
    console.log(forum);
    this.forumService.NewForum(forum).pipe(takeUntil(this.unsibscribe)).subscribe(
      (rep) => {
        this.route.navigate(['front/Forum']);
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
