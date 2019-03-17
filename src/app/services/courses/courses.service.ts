import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CourseModel } from '../../courses/course.model';
import { LoadingService } from '../loading/loading.service';

const COURSES_PATH = 'http://localhost:3004/courses';

@Injectable()
export class CoursesService {

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService
  ) {
  }

  getAll(start?: number, count?: number, textFragment?: string): Observable<{ courses: CourseModel[], totalCount: number }> {
    this.loadingService.show();
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
        this.loadingService.hide();
        return {
          courses: _.map(courses, course => new CourseModel({ ...course })),
          totalCount
        };
      })
    );
  }

  add(course: CourseModel) {
    return this.http.post(`${COURSES_PATH}`, this.courseToDBRecord(course));
  }

  getById(courseId): Observable<CourseModel> {
    this.loadingService.show();

    return this.http.get(`${COURSES_PATH}/${courseId}`)
      .pipe(
        map(course => {
          this.loadingService.hide();
          return new CourseModel({ ...course } as any);
        })
      );
  }

  update(courseId, obj) {
    return this.getById(courseId)
      .pipe(
        map(course => {
            for (const prop in obj) {
              if (course.hasOwnProperty(prop)) {
                course[prop] = obj[prop];
              }
            }
            return this.http.put(`${COURSES_PATH}/${courseId}`, this.courseToDBRecord(course));
          }
        )
      );
  }

  delete(courseId) {
    return this.http.delete(`${COURSES_PATH}/${courseId}`);
  }

  courseToDBRecord(course: CourseModel) {
    return {
      ...course,
      id: course.id.toString()
    };
  }
}
