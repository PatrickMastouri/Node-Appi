import { Component, OnInit, ViewChild } from '@angular/core';
import { Project } from 'src/app/Domain/Model/Project';
import { DragDropService } from 'src/app/Domain/Services/dragdrop.service';
import { SharedService } from 'src/app/Domain/Services/shared.service';
import { ProjectService } from '../../Domain/Services/project.service';


@Component({
  selector: 'app-nodeapi',
  templateUrl: './nodeapi.component.html',
  styleUrls: ['./nodeapi.component.css']
})
export class NodeapiComponent implements OnInit {

  idUser = localStorage.getItem('id');
  projects = [Project];
  tables: any[];

  mySelectedProjectValue: String = "------";
  mySelectedProjectId: any

  mySelectedTableValue: String = "------";

  projectSelected: boolean = false;
  tableSelected: boolean = false;

  updatedSuccessfully: boolean = false;
  cantUpdate: boolean = false;
  projectError: boolean = false;

  //teb3in el Save Changes
  addisChecked: number;
  updateisChecked: number;
  deleteisChecked: number;
  showisChecked: number;


  etat: number[] = [0, 0, 0, 0]
  message: string;

  constructor(private shared: SharedService, private projectService: ProjectService, private dragDropService: DragDropService) { }

  ngOnInit(): void {
    this.message = this.shared.getMessage();
    console.log("Our id is" + this.message);
    this.getAllProjects();
  }


  public getAllProjects() {                 //get all user Projects
    this.projectService.getProjects(this.idUser).subscribe(res => {
      this.projects = res.data;
      console.log("getAllProjectsFunc / " + this.projects);
    });
  }

  onProjectOptionsSelected(value: String) {
    this.projectError = false;
    this.tableSelected = false;
    this.updatedSuccessfully = false;
    this.cantUpdate = false;
    if (value != "Please Select a Project") {
      this.projectSelected = true;
      this.mySelectedProjectValue = value;
      //console.log("the selected Project value is " + this.mySelectedProjectValue);
      // bch innajem yab3eth el id mta3 leprojet
      this.projects.forEach(element => {
        if (element.name == value) {
          console.log(element.id)
          this.mySelectedProjectId = element.id;
        }
      });
      //////////////////////////////////////
      this.projectService.getTables(this.mySelectedProjectValue, this.mySelectedProjectId).subscribe(res => {
        if (res.data) {
          //console.log(res.data.name)
          this.tables = res.data;
        }
        else {
          console.log("Cant get tables from this project")
          this.projectSelected = false;
          this.mySelectedProjectValue = "------";
          this.projectError = true;
        }
      });
    } else {
      this.projectSelected = false;
      this.mySelectedProjectValue = "------";
    }
  }


  public onTableOptionsSelected(value: String) {
    this.updatedSuccessfully = false;
    this.cantUpdate = false;
    this.addisChecked = 0;
    this.updateisChecked = 0;
    this.deleteisChecked = 0;
    this.showisChecked = 0;
    if (value != "Please Select a Table") {
      this.mySelectedTableValue = value;
      this.projectService.getTables(this.mySelectedProjectValue, this.mySelectedProjectId).subscribe(res => {
        res.data.forEach((jsonvalues) => {
          if (jsonvalues.name == this.mySelectedTableValue) {
            if (jsonvalues.add == 1) {
              this.addisChecked = 1;
            }
            if (jsonvalues.update == 1) {
              this.updateisChecked = 1;
            }
            if (jsonvalues.delete == 1) {
              this.deleteisChecked = 1;
            }
            if (jsonvalues.show == 1) {
              this.showisChecked = 1;
            }
            this.tableSelected = true;
          }
        });
      });
    } else {
      this.tableSelected = false;
    }
  }

  saveChanges() {
    this.updatedSuccessfully = false;
    this.cantUpdate = false;
    this.etat[0] = this.addisChecked ? 1 : 0;
    this.etat[1] = this.updateisChecked ? 1 : 0;
    this.etat[2] = this.deleteisChecked ? 1 : 0;
    this.etat[3] = this.showisChecked ? 1 : 0;
    this.projectService.UpdateProjectJson(this.mySelectedProjectId, this.mySelectedTableValue, this.mySelectedProjectValue, this.etat).subscribe(res => {
      if (res.succes == 1) {
        console.log(res)
        this.updatedSuccessfully = true;
      }
      else {
        console.log("error")
        this.cantUpdate = true;
      }
    });
  }

  generateClicked() {

    this.projectService.getById(this.mySelectedProjectId).subscribe(res1 => {
      this.projectService.getAllJson(res1.data.name, this.mySelectedProjectId).subscribe(res2 => {
        console.log(res2.dbType)
        if (res2.dbType == "MySql") {
          this.projectService.generateProject(this.mySelectedProjectValue, this.mySelectedProjectId).subscribe(res3 => {
            if (res3.succes == 1) {
              console.log(res3)
            }
            else {
              console.log("error")
            }
          });
        } else {
          this.dragDropService.setId(this.mySelectedProjectId)
          this.dragDropService.setPort(res1.data.port)
          this.dragDropService.test();
          this.dragDropService.generate_mongo(res2)
          console.log(res2)
        }
      });
    })

    //this.dragDropService.generate_mongo(form["tables"] || {})
    console.log(this.tables)
    /*
    this.projectService.generateProject(this.mySelectedProjectValue, this.mySelectedProjectId).subscribe(res => {
      if(res.succes == 1){
        console.log(res)
      }
      else{
        console.log("error")
      }
    });
    */
  }

}
