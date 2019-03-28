import * as _ from 'lodash';
import { Guid } from 'guid-typescript';
import { Author } from './author.model';

export class CourseModel {
  public id: Guid;
  public title: string;
  public creationDate: Date;
  public duration: number; // in seconds
  public description: string[];
  public topRated: boolean;
  public authors: Author[];

  constructor({
                id = '',
                title = 'New Course',
                creationDate = new Date(),
                duration = 0,
                description = [],
                topRated = false,
                authors = []
  }) {
    this.id = id ? Guid.parse(id) : Guid.create();
    this.title = title;
    this.creationDate = new Date(creationDate);
    this.duration = duration;
    this.description = description;
    this.topRated = topRated;
    this.authors = _.map(authors, author => new Author({ ...author }));
  }
}
