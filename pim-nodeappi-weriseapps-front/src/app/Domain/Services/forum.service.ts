import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Forum} from '../Model/forum';
@Injectable({
  providedIn: 'root'
})
export class ForumService {
  path = 'http://localhost:3000/api/forums/' ;
  constructor(private http: HttpClient) {
  }

  getForums(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/api/forums/getAll');
  }

  NewForum(forum: Forum): any{
  return this.http.post('http://localhost:3000/api/forums/add' , JSON.stringify(forum));
  }

  delete(id: string): any{
    return this.http.delete('http://localhost:3000/api/forums/' + id);

  }

  updateForum(id: string, forum): any {
    return this.http.patch('http://localhost:3000/api/forums/update/' + id , JSON.stringify(forum));
  }

  getForumById(id: string): Observable<any>{
    return this.http.get('http://localhost:3000/api/forums/' + id);
  }

  GetForumBySubject(subject: string): Observable<any>{
    return this.http.get<any>('http://localhost:3000/api/forums/name/get/' + subject);
  }


  GetForumByTag(tag: string): Observable<any>{
    return this.http.get<any>('http://localhost:3000/api/forums/tag/gettag/' + tag);
  }


}

