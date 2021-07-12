import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Http, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser'
import { Project } from 'src/app/Domain/Model/Project';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Payment } from 'src/app/Domain/Model/payment';
import { PaymentService } from 'src/app/Domain/Services/payment.service';
import { ProjectService } from 'src/app/Domain/Services/project.service';

import * as fileSaver from 'file-saver';
@Component({
  selector: 'app-myproject',
  templateUrl: './myproject.component.html',
  styleUrls: ['./myproject.component.css']
})
export class MyprojectComponent implements OnInit {
  idUser = localStorage.getItem('id');
  paymentList: Payment[];
  payment: any[];
  constructor(private projectService: ProjectService,private paymentService: PaymentService, private route: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.getPaymentByUsersId();
  }
  public getPaymentByUsersId() {
    this.paymentService.getPaymentByUsersId(this.idUser).subscribe(
      res => {
        this.paymentList = res.data;
        console.log(this.paymentList);
      })
  }
  download(id: string) {

    this.paymentService.getPaymentById(id).subscribe(
      response => {
        this.paymentService.down(response.data.project_id).subscribe(
          response => {
            fileSaver.saveAs(response, 'js.tar.gz');

            console.log(response,"this is my response");
          },
          error => {
            console.log(error);
          });
      },
      error => {
        console.log(error);
      });

    //this.fileService.downloadFile().subscribe(response => {
    this.paymentService.downloadFile().subscribe((response: any) => { //when you use stricter type checking
      //let blob: any = new Blob([response], { type: 'zip/rar; charset=utf-8' });
      //const url = window.URL.createObjectURL(blob);
      //window.open(url);
      //window.location.href = response.url;
      fileSaver.saveAs(response, 'js.tar.gz');
      //}), error => console.log('Error downloading the file'),
    }), (error: any) => console.log('Error downloading the file'), //when you use stricter type checking
      () => console.info('File downloaded successfully');
      
  }



  run(id: string): void {
    this.paymentService.getPaymentById(id).subscribe(
      response => {


        this.projectService.getById(response.data.project_id).subscribe(
          proj => {

            const project = new Project();
            project.name = proj.data.name.split(' ').join('_');
            project.port = proj.data.port;
            console.log(proj.data.name.split(' ').join('_'))
            this.paymentService.runOnServer(response.data.project_id,project).subscribe(
              response => {
                console.log(response.data.project_id);
              },
              error => {
                console.log(error);
              });
          });

      },
      error => {
        console.log(error);
      });
  }

}
