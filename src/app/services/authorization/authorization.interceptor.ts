import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthorizationState } from '../../store/reducers/auth.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
  private token;

  constructor (
    private authStore: Store<AuthorizationState>
  ) {
    this.authStore.select('auth').subscribe(({ token }) => this.token = token);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', this.token)
    });

    return next.handle(authRequest);
  }
}
