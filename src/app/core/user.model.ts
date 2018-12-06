import { Guid } from 'guid-typescript';

export interface UserModel {
  id: Guid;
  firstName: string;
  lastName: string;
}
