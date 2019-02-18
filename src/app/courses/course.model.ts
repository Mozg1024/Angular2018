import { Guid } from 'guid-typescript';

export class CourseModel {
  public id: Guid;
  public title: string;
  public creationDate: Date;
  public duration: number; // in seconds
  public description: string[];
  public topRated: boolean;

  constructor({
                title = 'New Course',
                creationDate = new Date(),
                duration = 0,
                description = [],
                topRated = false
  }) {
    this.id = Guid.create();
    this.title = title;
    this.creationDate = creationDate;
    this.duration = duration;
    this.description = description;
    this.topRated = topRated;
  }
}
