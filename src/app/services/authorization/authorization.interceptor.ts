import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthorizationService } from './authorization.service';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
  constructor (
    private authService: AuthorizationService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', this.authService.token)
    });

    return next.handle(authRequest);
  }
}
