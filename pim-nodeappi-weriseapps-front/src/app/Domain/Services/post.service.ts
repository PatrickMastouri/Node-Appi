import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Posts} from '../Model/posts';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  path = 'http://localhost:3000/api/posts';

  constructor(private http: HttpClient) {
  }

  getPostsByForumSubject(subject): any{
    return this.http.get<any>('http://localhost:3000/api/posts/forum/' + subject);

  }

  NewPost(posts: Posts): any{
    return this.http.post('http://localhost:3000/api/posts/addPost' , JSON.stringify(posts));
  }

  delete(id: string): any{
    return this.http.delete('http://localhost:3000/api/posts/' + id);
  }


  updatePost(id: string, post): any {
    return this.http.patch('http://localhost:3000/api/posts/update/' + id , JSON.stringify(post));
  }

  getPostById(id: string): Observable<any>{
    return this.http.get('http://localhost:3000/api/posts/' + id);
  }


  getCommentsNumber(id: string): Observable<any>{
    return this.http.get('http://localhost:3000/api/comments/getNumber/' + id);
  }


  getPostByTags(tag: string): Observable<any>{
    return this.http.get('http://localhost:3000/api/posts/name/get/' + tag);
  }

  getAllPosts(): Observable<any>{
    return this.http.get('http://localhost:3000/api/posts/GetAll');
  }


}

