import { Guid } from 'guid-typescript';

export class UserModel {
  public id: Guid;
  public firstName: string;
  public lastName: string;

  constructor(firstName, lastName) {
    this.id = Guid.create();
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
