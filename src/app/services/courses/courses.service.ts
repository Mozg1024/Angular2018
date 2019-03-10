import { Injectable } from '@angular/core';
import { CourseModel } from '../../courses/course.model';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

const COURSES_PATH = 'http://localhost:3004/courses';

@Injectable()
export class CoursesService {

  constructor(
    private http: HttpClient
  ) {
  }

  getAll(start?: number, count?: number, textFragment?: string): Observable<{ courses: CourseModel[], totalCount: number }> {
    start = start || 0;
    count = count || 0;
    textFragment = textFragment || '';
    return this.http.get(`${COURSES_PATH}`, {
      params: {
        start: start.toString(),
        count: count.toString(),
        textFragment
      }
    }).pipe(
      map(result => {
        const { courses, totalCount } = result as any;
        return {
          courses: _.map(courses, course => new CourseModel({ ...course })),
          totalCount
        };
      })
    );
  }

  add(course: CourseModel) {
    return this.http.post(`${COURSES_PATH}`, this.courseToDBRecord(course))
      .toPromise().then(
        () => {
          console.log('Course added.');
        },
        error => {
          console.log(error);
        }
      );
  }

  getById(courseId): Observable<CourseModel>  {
    return this.http.get(`${COURSES_PATH}/${courseId}`)
      .pipe(
        map(course => new CourseModel({ ...course } as any))
      );
  }

  update(courseId, obj) {
    return this.getById(courseId).toPromise().then(
      course => {
        for (const prop in obj) {
          if (course.hasOwnProperty(prop)) {
            course[prop] = obj[prop];
          }
        }
        return this.http.put(`${COURSES_PATH}/${courseId}`, this.courseToDBRecord(course))
          .toPromise().then(
            () => {
              console.log('Course updated.');
            },
            error => {
              console.log(error);
            }
          );
      },
      error => {
        console.log(error);
      }
    );

  }

  delete(courseId) {
    return this.http.delete(`${COURSES_PATH}/${courseId}`)
      .toPromise().then(
        () => {
          console.log('Course deleted.');
        },
        error => {
          console.log(error);
        }
      );
  }

  courseToDBRecord(course: CourseModel) {
    return {
      ...course,
      id: course.id.toString()
    };
  }
}
