import { Injectable } from '@angular/core';
import { CourseModel } from '../../courses/course.model';
import { addDays } from 'date-fns';

@Injectable()
export class CoursesService {

  private _courseList = [];

  constructor() {
    for (let i = 1; i <= 10; i++) {
      this._courseList.push(new CourseModel({
        title: `Course ${i} title`,
        creationDate: addDays(Date.now(), Math.floor(Math.random() * 40) - 20),
        duration: Math.floor(Math.random() * 1000),
        description: [`Course ${i} description`, `Course ${i} description`, `Course ${i} description`],
        topRated: !!Math.round(Math.random())
      }));
    }
  }

  getAll(): CourseModel[] {
    return this._courseList;
  }

  add(course: CourseModel) {
    this._courseList.push(course);
  }

  getById(courseId): CourseModel | undefined {
    return this._courseList.find(course => course.id.equals(courseId));
  }

  update(courseId, obj) {
    const course = this.getById(courseId);
    for (const prop in obj) {
      if (course.hasOwnProperty(prop)) {
        course[prop] = obj[prop];
      }
    }
  }

  delete(courseId) {
    this._courseList = this._courseList.filter(course => !course.id.equals(courseId));
  }
}
