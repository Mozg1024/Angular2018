import { Injectable } from '@angular/core';
import { UserModel } from '../../core/user.model';

@Injectable()
export class AuthorizationService {
  private storage = new Map();

  constructor() { }

  public login(user: UserModel, token) {
    this.storage.set(token, user);
  }

  public logout(token) {
    this.storage.delete(token);
  }

  public isAuthenticated(token): boolean {
    return this.storage.has(token);
  }

  public getUserInfo(token): UserModel {
    return this.storage.get(token);
  }

}
