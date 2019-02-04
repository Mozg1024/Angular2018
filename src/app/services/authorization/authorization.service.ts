import { Injectable } from '@angular/core';
import { UserModel } from '../../core/user.model';
import { Router } from '@angular/router';

@Injectable()
export class AuthorizationService {
  private storage = new Map();

  constructor(private router: Router) { }

  public login(user: UserModel, token) {
    this.storage.set(token, user);
    this.router.navigate(['/courses']);
  }

  public logout(token) {
    this.storage.delete(token);
    this.router.navigate(['/login']);
  }

  public isAuthenticated(token): boolean {
    return this.storage.has(token);
  }

  public getUserInfo(token): UserModel {
    return this.storage.get(token);
  }

}
