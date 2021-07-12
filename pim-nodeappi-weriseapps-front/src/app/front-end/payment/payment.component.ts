import { Project } from 'src/app/Domain/Model/Project';
import {Router} from '@angular/router';
import { Subject } from 'rxjs';
import { Payment } from 'src/app/Domain/Model/payment';
import { PaymentService } from '../../Domain/Services/payment.service';



import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {takeUntil} from 'rxjs/operators';
import { ProjectService } from 'src/app/Domain/Services/project.service';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  
  idUser = localStorage.getItem('id');
  projects = [Project];
  tables : any[];
  AddPayment: FormGroup ;
  submitted = false;
  project_id = Project.id;
  unsibscribe = new Subject<void>();
  @Input('id') payment_id: number;


  selectedDay: string = '';


  constructor(private paymentService: PaymentService,private route: Router,private projectService :ProjectService) {


    this.AddPayment = new FormGroup({
      subject : new FormControl('', [Validators.required]),
      description : new FormControl('', [Validators.required]),
      tags : new FormControl('', [Validators.required]),
    });
  }
 

  ngOnInit(): void {
    this.getAllProjects();
  }
  
  public getAllProjects() {                 //get all user Projects
    this.projectService.getProjects(this.idUser).subscribe(res => {
      this.projects = res.data;
      console.log("getAllProjectsFunc / "+this.projects);
    });
  }

  navigateTo(event: any): void {
    this.selectedDay = event.target.value;
      //this.router.navigate( ['blockchain']);
      console.log("selected value"+this.selectedDay)
     
  }
  
  

  onSelect(selectedItem: any) {
    //Ajout
    const payment = new Payment();
    payment.user_id = this.idUser;
    payment.cost = 1000;
    payment.paymentmethode = this.selectedDay;
    payment.project_id = selectedItem.id;
    payment.nom = selectedItem.name;

    this.paymentService.NewPayment(payment).pipe(takeUntil(this.unsibscribe)).subscribe(
      (rep)=>{
        console.log("Selected item Id: ", selectedItem.id,"Selected item name: ",selectedItem.name,"select: ",this.selectedDay); // You get the Id of the selected item here
      }
      , (error) => {
        console.log(error);
      }
    );


       
}
  


  
}
