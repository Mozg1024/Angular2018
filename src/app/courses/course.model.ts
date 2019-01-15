import { Guid } from 'guid-typescript';

export class CourseModel {
  public id: Guid;
  public title: string;
  public creationDate: Date;
  public duration: number;
  public description: string[];

  constructor({ title, creationDate, duration, description }) {
    this.id = Guid.create();
    this.title = title;
    this.creationDate = creationDate;
    this.duration = duration;
    this.description = description;
  }
}
