import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/Domain/Model/Project';
import { DragDropService } from 'src/app/Domain/Services/dragdrop.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../../Domain/Services/project.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  Project: FormGroup;
  port;
  constructor(private dragDropService: DragDropService, private route: Router, private projectService: ProjectService) {


    this.Project = new FormGroup({
      pName: new FormControl('', [Validators.required]),
      pDescription: new FormControl('', [Validators.required])
    });

  }




  ngOnInit(): void {


    this.projectService.getAllProjects().subscribe(res => {
      if (res.data.length == 0) {
        this.port = 4000

      } else {
        this.port = res.data[res.data.length - 1].port + 1
      }
    });

  }

  onSubmit() {

    const proj = new Project();
    localStorage.getItem('id');
    proj.name = this.Project.value.pName;
    proj.user_id = localStorage.getItem('id');
    proj.description = this.Project.value.pDescription;
    proj.port = this.port;

    this.dragDropService.post(proj).subscribe(
      (rep) => {
        this.dragDropService.setId(rep.project.id);
        this.dragDropService.setName(rep.project.name);

        console.log(this.dragDropService.getId())

      }, (error) => {
        console.log(error);
      }
    );
  }

}
