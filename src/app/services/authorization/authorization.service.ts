import { Injectable } from '@angular/core';
import { UserModel } from '../../core/user.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadingService } from '../loading/loading.service';
import { Store } from '@ngrx/store';
import { AuthorizationState } from '../../store/reducers/auth.reducer';
import { SetIsAuthenticated, SetToken, SetUserInfo } from '../../store/actions/auth.actions';
import { map } from 'rxjs/operators';

const LOGIN_PATH = 'http://localhost:3004/auth/login';
const USER_INFO_PATH = 'http://localhost:3004/auth/userinfo';

@Injectable()
export class AuthorizationService {
  constructor(
    private authStore: Store<AuthorizationState>,
    private router: Router,
    private loadingService: LoadingService,
    private http: HttpClient
  ) { }

  public login(login: string, password: string) {
    this.loadingService.show();
    return this.http.post(`${LOGIN_PATH}`, {
      login,
      password
    }).subscribe(({ token }: any) => {
      this.authStore.dispatch(new SetToken({ token }));
      this.authStore.dispatch(new SetIsAuthenticated({ isAuthenticated: true }));

      this.http.post(`${USER_INFO_PATH}`, null).subscribe(({ firstName, lastName }: any) => {

        this.authStore.dispatch(new SetUserInfo({
          userInfo: new UserModel({ firstName, lastName })
        }));

        this.router.navigate(['/courses']);
        console.log(`User ${login} logged in successfully.`);
        this.loadingService.hide();
      }, (error) => {
        console.log(error);
        this.loadingService.hide();
      });
    }, (error) => {
      console.log(error);
      this.loadingService.hide();
    });
  }

  public logout() {
    this.loadingService.show();
    this.authStore.dispatch(new SetIsAuthenticated({ isAuthenticated: false }));
    this.router.navigate(['/login']);
    console.log('User is logged out.');
    this.loadingService.hide();
  }

  public isAuthenticated(): Observable<boolean> {
    return this.authStore.select('auth')
      .pipe(
        map(({ isAuthenticated }) => isAuthenticated)
      );
  }

  public userInfo(): Observable<UserModel> {
    return this.authStore.select('auth')
      .pipe(
        map(({ userInfo }) => userInfo)
      );
  }
}
