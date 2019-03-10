import { Injectable } from '@angular/core';
import { UserModel } from '../../core/user.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

const LOGIN_PATH = 'http://localhost:3004/auth/login';
const USER_INFO_PATH = 'http://localhost:3004/auth/userinfo';

@Injectable()
export class AuthorizationService {
  private storage = new Map();
  private _token = '';

  public get token() {
    return this._token;
  }

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  public login(login: string, password: string) {
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
        this.router.navigate(['/courses']);
        console.log(`User ${login} logged in successfully.`);
      }, (error) => {
        console.log(error);
      });
    }, (error) => {
      console.log(error);
    });
  }

  public logout() {
    this.storage.delete(this.token);
    this.router.navigate(['/login']);
    console.log('User is logged out.');
  }

  public isAuthenticated(): boolean {
    return this.storage.has(this.token);
  }

  public getUserInfo(): UserModel {
    return this.storage.get(this.token);
  }

}
