import {Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild} from '@angular/core';
import {ForumService} from '../../Domain/Services/forum.service';
import {Forum} from '../../Domain/Model/forum';
import {Router} from '@angular/router';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  @Output() idEmitter = new EventEmitter<number>();
  forums: Forum [] = [] ;
  forum: Forum ;
   id: string;
  owner = false;
  playerName: string;



  constructor(private forumService: ForumService, private  router: Router
  ) {}

  Utilisateur = localStorage.getItem('id');
  ngOnInit(): void {
    this.getAllForum();
  }

  setId(id: number, subject: string): void {
  this.idEmitter.emit(id);
  console.log(id);
  this.router.navigate(['/posts/:subject']);
  }

  private getAllForum(): void {
    this.forumService.getForums().subscribe(
      result => {
      this.forums = result.data.map(
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


  deleteForum(id): void {

    this.forumService.delete(id).subscribe(
      response => {
        console.log(response);
        console.log(this.id);
        window.location.reload();
      },
      error => {
        console.log(error); });

  }

  search(subject: string): any{
    console.log('myInput' + subject);
    this.forumService.GetForumBySubject(subject).subscribe(
      result => {
        this.forums = result.data.map(
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

  ByTag(tag: string){
    this.forumService.GetForumByTag(tag).subscribe(
      result => {
        this.forums = result.data.map(
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
}
