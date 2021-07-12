import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from '../Model/payment';
import { Project } from '../Model/Project';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  idUser = localStorage.getItem('id');
  path = 'http://localhost:3000/api/payments/';
  pathproject = 'http://localhost:3000/api/projects/';

  constructor(private http: HttpClient) { }

  getPaymentByUsersId(idUser: string): Observable<any> {
    return this.http.get("http://localhost:3000/api/payments/user/" + idUser);
  }

  getPayment(): Observable<any> {
    return this.http.get<any>("http://localhost:3000/api/payments/getAll");
  }
  getProjectByUsersId(idUser: any): Observable<any> {
    return this.http.get<any>(this.pathproject + 'user/' + idUser);
  }

  NewPayment(payment: Payment) {
    return this.http.post('http://localhost:3000/api/payments/add', JSON.stringify(payment));
  }

  downloadFile(): any {

    return this.http.get('http://localhost:3000/api/projects/' + Project.id, { responseType: 'blob' });
  }

  getPaymentById(id: string): Observable<any> {
    return this.http.get("http://localhost:3000/api/payments/" + id);
  }

  runOnServer(id: string,formData): Observable<any> {
    return this.http.post("http://localhost:3000/api/payments/upload/" + id ,formData);
  }
  down(id: string): Observable<any> {
    return this.http.post("http://localhost:3000/api/payments/download/" + id ,null);
  }
  /*
  getProjectByPaymentId(idPayment: string): Observable<any> {
    return this.http.get("http://localhost:3000/api/payments/user/" + getPaymentById(idPayment));
  }
  */
}
