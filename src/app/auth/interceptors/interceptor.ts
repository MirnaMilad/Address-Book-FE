import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class Intercepter implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!request.url.includes('Account')) {
      const token = localStorage.getItem('token');

      let headers;
      if (!request.url.includes('upload')) {   
        headers = request.headers.set('Content-Type', 'application/json'); 
      }

      if (token) {
        headers = request.headers.set('Authorization', 'Bearer ' + token);
      }
      request = request.clone({
        headers: headers,
      });
    }
    return next.handle(request)
  }
}
