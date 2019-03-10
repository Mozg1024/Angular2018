import { Injectable } from '@angular/core';
import { CourseModel } from '../../courses/course.model';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
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
    this.loadingService.show();
    return this.http.post(`${COURSES_PATH}`, this.courseToDBRecord(course))
      .toPromise().then(
        () => {
          console.log('Course added.');
        },
        error => {
          console.log(error);
        }
      ).finally(() => {
        this.loadingService.hide();
      });
  }

  getById(courseId): Observable<CourseModel>  {
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
    this.loadingService.show();

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
    ).finally(() => {
      this.loadingService.hide();
    });

  }

  delete(courseId) {
    this.loadingService.show();

    return this.http.delete(`${COURSES_PATH}/${courseId}`)
      .toPromise().then(
        () => {
          console.log('Course deleted.');
        },
        error => {
          console.log(error);
        }
      ).finally(() => {
        this.loadingService.hide();
      });
  }

  courseToDBRecord(course: CourseModel) {
    return {
      ...course,
      id: course.id.toString()
    };
  }
}
