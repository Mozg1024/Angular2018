import { Injectable } from '@angular/core';
import { UserModel } from '../../core/user.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthorizationService {
  private LOGIN_PATH = 'http://localhost:3004/auth/login';
  private USER_INFO_PATH = 'http://localhost:3004/auth/userinfo';
  private storage = new Map();
  private token: string;

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  public login(login: string, password: string) {
    return this.http.post(`${this.LOGIN_PATH}`, {
      login,
      password
    }).subscribe((res) => {
      this.token = (res as any).token;
      this.http.post(`${this.USER_INFO_PATH}`, null, {
        headers: {
          'Authorization': this.token
        }
      }).subscribe((res) => {
        const userInfo: any = res;
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
