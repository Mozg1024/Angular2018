import { Action } from '@ngrx/store';
import { UserModel } from '../../core/user.model';

export enum ActionTypes {
  SetToken = '[Auth] Set Token',
  SetUserInfo = '[Auth] Set UserInfo',
  SetIsAuthenticated = '[Auth] Set isAuthorized'
}

export type ActionsUnions = SetIsAuthenticated | SetToken | SetUserInfo;

export class SetIsAuthenticated implements Action {
  readonly type = ActionTypes.SetIsAuthenticated;

  constructor(public payload: { isAuthenticated: boolean }) {}
}

export class SetToken implements Action {
  readonly type = ActionTypes.SetToken;

  constructor(public payload: { token: string }) {}
}

export class SetUserInfo implements Action {
  readonly type = ActionTypes.SetUserInfo;

  constructor(public payload: { userInfo: UserModel }) {}
}
