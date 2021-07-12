import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';


@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string | null = localStorage.getItem('token');
    if (!(request.body instanceof FormData)) {
      request = request.clone({headers: request.headers.append('content-type', 'application/json')});
    }
    if (token) {
      request = request.clone({headers: request.headers.append('authorization', `Bearer ${token}`)});
    }
    return next.handle(request).pipe(
      catchError(
        (error, caught) => {
          if (error.status === 401) {
            this.handleAuthError();
            return of(error);
          }
          throw error;
        }
      )
    )as Observable<HttpEvent<any>> ;
  }

  private handleAuthError(): void {
    this.clearCache();
    this.router.navigateByUrl('/signin');
  }

  clearCache(): void {
    localStorage.clear();
  }
}
