import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Forum} from '../../Domain/Model/forum';
import {ForumService} from '../../Domain/Services/forum.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-forum-back',
  templateUrl: './forum-back.component.html',
  styleUrls: ['./forum-back.component.css']
})
export class ForumBackComponent implements OnInit {

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
}
