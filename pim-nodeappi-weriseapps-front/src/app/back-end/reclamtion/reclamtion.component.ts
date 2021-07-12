import { Component, OnInit } from '@angular/core';
import {ReclamationService} from '../../Domain/Services/reclamation.service';
import {Reclamation} from '../../Domain/Model/reclamation';

@Component({
  selector: 'app-reclamtion',
  templateUrl: './reclamtion.component.html',
  styleUrls: ['./reclamtion.component.css']
})
export class ReclamtionComponent implements OnInit {

  ReclamationList: Reclamation[];
  Reclamation: Reclamation;
  Utilisateur = localStorage.getItem('id');


  constructor(private reclamationService: ReclamationService) { }

  ngOnInit(): void {
    this.getReclamation();
  }

  getReclamation(): any{
    this.reclamationService.getReclamation().subscribe(
      data => this.ReclamationList = data.data

        .map(x => {
          console.log(this.Utilisateur, x.UserId);
          if (x.UserId === this.Utilisateur){

            return {...x, id: x._id};

          }
          else {
            return {...x,  id: x._id};
          }
        }),
      error => {
        console.log(error);
      });

  }

  changeEtat(id: string): any{
    this.reclamationService.updateEtat(id).subscribe(),
      error => {
        console.log(error);
      };
      console.log(id)
    alert("done..!!")
    //window.location.reload();
  }




}
