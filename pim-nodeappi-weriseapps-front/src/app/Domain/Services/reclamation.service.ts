import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Reclamation} from '../Model/reclamation';
@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  constructor(private http: HttpClient) {
  }

  getReclamation(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/api/reclamations/getAll');
  }

  Create(reclamation: Reclamation): any{
    return this.http.post('http://localhost:3000/api/reclamations/add' , JSON.stringify(reclamation));
  }

  delete(id: string): any{
    return this.http.delete('http://localhost:3000/api/reclamations/' + id);

  }

  updateReclamation(id: string, reclamation): any {
    return this.http.patch('http://localhost:3000/api/reclamations/update/' + id , JSON.stringify(reclamation));
  }

  getReclamationById(id: string): Observable<any> {
    return this.http.get('http://localhost:3000/api/reclamations/' + id);
  }

  getReclamationbyUser(id: string): Observable<any> {
    return this.http.get<any>('http://localhost:3000/api/reclamations/user/' + id);
  }

  updateEtat(id: string) {
    return this.http.patch('http://localhost:3000/api/reclamations/Etat/' + id, null);
  }


}

