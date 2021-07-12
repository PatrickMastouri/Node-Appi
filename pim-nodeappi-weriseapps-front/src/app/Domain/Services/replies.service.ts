import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Comments} from '../Model/comments';
import {Observable} from 'rxjs';
import {Forum} from '../Model/forum';

@Injectable({
  providedIn: 'root'
})
export class RepliesService {
  path = 'http://localhost:3000/api/replys/';

  constructor(private http: HttpClient) { }

  getPostById(id: string): Observable<any> {
    return this.http.get('http://localhost:3000/api/posts/' + id);
  }


  getCommentsByUSer(idPost: string): Observable<any>{
    return this.http.get<any>('http://localhost:3000/api/comments/posts/' + idPost);


}

AddComment(comments: Comments): any{
    return this.http.post('http://localhost:3000/api/comments/addComment' , JSON.stringify(comments));
  }

  deleteComment(id: string): any{
    return this.http.delete('http://localhost:3000/api/comments/' + id);
  }




}
