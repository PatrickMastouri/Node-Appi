import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/Domain/Services/project.service';
import { SharedService } from 'src/app/Domain/Services/shared.service';
import { Router } from '@angular/router';
import { DragDropService } from 'src/app/Domain/Services/dragdrop.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: any;
  tables: any;
  constructor(private projectService: ProjectService, private shared: DragDropService, private router: Router) { }
  idUser = localStorage.getItem('id');

  ngOnInit(): void {
    this.getAllProjects();
  }

  public getAllProjects() {                 //get all user Projects
    this.projectService.getProjects(this.idUser).subscribe(res => {
      this.projects = res.data;
      console.log("getAllProjectsFunc / " + this.projects);
    });
  }

  public onGoToFunctions(id: string,name: string) {
    //console.log(id);

    this.shared.setId(id);
    this.router.navigate(['/front/nodeapi'])
  }

  public onGoToTables(id: string,name: string) {
    //console.log(id);

    this.shared.setId(id);
    this.shared.setName(name);


    this.projectService.getById(id).subscribe(res => {
      this.projectService.getAllJson(res.data.name, id).subscribe(res => {
        if (res.tables) {
          this.shared.setTables(res);
          this.router.navigate(['/front/dragdrop'])
        }
        else {
          console.log("Cant get tables from this project")
          this.router.navigate(['/front/dragdrop'])

          //this.fillFromJson(this.promiseResult)
        }
      });
    })


  }
}
