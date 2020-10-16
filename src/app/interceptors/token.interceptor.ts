import { SecureService } from 'src/app/services/secure.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private secureService:SecureService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    //Don't intercept for register and login   
    if (request.url.includes('/register') || request.url.includes('/login')) {
      return next.handle(request);
    }

    //Don't intercept for getCoupons in homepage
    if (request.url.includes('/general')) {
      return next.handle(request);
    }
    
    const authReq = request.clone({
      headers: new HttpHeaders({
        'Token':  this.secureService.getToken(),
      })
    });

    return next.handle(authReq);
  }
}
