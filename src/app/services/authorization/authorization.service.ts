import { Injectable } from '@angular/core';
import { UserModel } from '../../core/user.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { LoadingService } from '../loading/loading.service';

const LOGIN_PATH = 'http://localhost:3004/auth/login';
const USER_INFO_PATH = 'http://localhost:3004/auth/userinfo';

@Injectable()
export class AuthorizationService {
  private storage = new Map();
  private _token = '';
  private userInfoSubject = new ReplaySubject(1);
  private isAuthenticatedSubject = new ReplaySubject(1);

  public get token() {
    return this._token;
  }

  constructor(
    private router: Router,
    private loadingService: LoadingService,
    private http: HttpClient
  ) { }

  public login(login: string, password: string) {
    this.loadingService.show();
    return this.http.post(`${LOGIN_PATH}`, {
      login,
      password
    }).subscribe((res: any) => {
      this._token = res.token;
      this.http.post(`${USER_INFO_PATH}`, null).subscribe((userInfo: any) => {
        const user = new UserModel({
          firstName: userInfo.firstName,
          lastName: userInfo.lastName
        });
        this.storage.set(this.token, user);
        this.onUserChanged(user);
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
    this.storage.delete(this.token);
    this.onUserChanged(null);
    this.router.navigate(['/login']);
    console.log('User is logged out.');
    this.loadingService.hide();
  }

  public isAuthenticated(): Observable<any> {
    return this.isAuthenticatedSubject;
  }

  public userInfo(): Observable<any> {
    return this.userInfoSubject;
  }

  private onUserChanged(user: UserModel | null) {
    this.userInfoSubject.next(user);
    this.isAuthenticatedSubject.next(!!user);
  }
}
