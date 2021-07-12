import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../Model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  path = 'http://localhost:3000/api/users/' ;

  constructor( private http: HttpClient) { }


  register(user: User): Observable<any>{
    console.log(JSON.stringify(user));
    return this.http.post<any>(this.path, JSON.stringify(user));
  }

  signin(email: string, password: string): Observable<any>{
    return this.http.post<any>(this.path + 'login', '{"mail":"' + email + '","password": "' + password + '"}');
  }

  forgetPasswordSendMail(email: string): Observable<any>{
    return this.http.post<any>(this.path+'forgetpasswordconfirmation', '{"mail":"' + email + '"}');
  }

  changePassword(code: string, email: string, password: string): Observable<any>{
    return this.http.patch<any>(this.path + 'forgetpasswordchange', '{"mail":"' + email + '","password": "' + password + '","code": "' + code + '"}');
  }

  getUser(idUser: any): Observable<any> {
    return this.http.get<any>(this.path + idUser)
  }

  UpdateUser(user: User): Observable<any>{
    return this.http.patch<any>(this.path, JSON.stringify(user));
  }

  getAllUsers(): Observable<any>{
    return this.http.get<any>(this.path);
  }
  
}
