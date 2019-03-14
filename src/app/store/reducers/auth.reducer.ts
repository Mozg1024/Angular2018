import * as Auth from '../actions/auth.actions';
import { UserModel } from '../../core/user.model';

export interface AuthorizationState {
  token: string;
  isAuthenticated: boolean;
  userInfo: UserModel | null;
}

export const initialState: AuthorizationState = {
  token: '',
  isAuthenticated: false,
  userInfo: null
};

export function authReducer(state = initialState, { type, payload }: Auth.ActionsUnions) {
  switch (type) {
    case Auth.ActionTypes.SetToken:
    case Auth.ActionTypes.SetUserInfo:
      return {
        ...state,
        ...payload
      };
    case Auth.ActionTypes.SetIsAuthenticated:

      return payload['isAuthenticated']
        ? { ...state, isAuthenticated: true }
        : initialState;

    default:
      return state;
  }
}
