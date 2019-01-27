import { Guid } from 'guid-typescript';

export class CourseModel {
  public id: Guid;
  public title: string;
  public creationDate: Date;
  public duration: number;
  public description: string[];
  topRated: boolean;

  constructor({ title, creationDate, duration, description, topRated }) {
    this.id = Guid.create();
    this.title = title;
    this.creationDate = creationDate;
    this.duration = duration;
    this.description = description;
    this.topRated = topRated;
  }
}
