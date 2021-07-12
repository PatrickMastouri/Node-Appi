import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  idUser = localStorage.getItem('id');
  path = 'http://localhost:3000/api/projects/' ;

  constructor( private http: HttpClient) { }

  getById(projectId: any): Observable<any> {                             //get projects by user id
    return this.http.get<any>(this.path +'/'+ projectId);
  }
  getProjects(idUser: any): Observable<any> {                             //get projects by user id
    return this.http.get<any>(this.path +'user/'+ idUser);
  }
  getAllProjects(): Observable<any> {                             //get projects by user id
    return this.http.get<any>(this.path);
  }
  getTables(projectName: any, projectId: any): Observable<any> {          //get tables by project name and id
    return this.http.post<any>(this.path + 'getJson', '{"name":"'+ projectName +'","id": "' + projectId + '"}');
  }

  getAllJson(projectName: any, projectId: any): Observable<any> {          //get tables by project name and id
    return this.http.post<any>(this.path + 'getAllJson', '{"name":"'+ projectName +'","id": "' + projectId + '"}');
  }

  UpdateProjectJson(projectId: any,tableName: String, projectName: String, etat: number[]): Observable<any> {
    return this.http.post<any>(this.path + 'updateJson', '{ "id": "' + projectId + '" ,"pname":"' + projectName + '","tname": "' + tableName + '","add": "' + etat[0] + '","update": "' + etat[1] + '","delete": "' + etat[2] + '","show": "' + etat[3] + '"}');
  }

  generateProject(projectName: String , projectId: any):Observable<any> {
    return this.http.post<any>(this.path + 'generateProject', '{ "id": "' + projectId + '" ,"projectName":"' + projectName + '"}');
  }

}
