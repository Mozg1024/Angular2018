import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, withLatestFrom } from 'rxjs/operators';

import { LoadingService } from '../../services/loading/loading.service';
import { CoursesService } from '../../services/courses/courses.service';
import * as Courses from '../actions/courses.actions';
import { CoursesListState, getCoursesState } from '../reducers/courses.reducer';

@Injectable()
export class CoursesEffects {

  @Effect()
  goToPage$ = this.actions$
    .pipe(
      ofType<Courses.GoToPage>(Courses.ActionTypes.GoToPage),
      withLatestFrom(this.coursesStore.select(getCoursesState)),
      mergeMap(([ action, coursesState ]) => {
        const pageIndex = action.payload.pageIndex;
        const start = coursesState.coursesPerPage * (pageIndex - 1);
        return this.coursesService.getAll(start, coursesState.coursesPerPage, coursesState.filter)
          .pipe(
            map(result => (new Courses.GoToPageSuccess({ ...result, pageIndex }))),
            catchError(error => of(new Courses.GoToPageFail({ error })))
          );
      })
    );

  @Effect()
  setFilter$ = this.actions$
    .pipe(
      ofType<Courses.SetFilter>(Courses.ActionTypes.SetFilter),
      withLatestFrom(this.coursesStore.select(getCoursesState)),
      mergeMap(([ action, coursesState ]) => {
        const filter = action.payload.filter;
        return this.coursesService.getAll(0, coursesState.coursesPerPage, filter)
          .pipe(
            map(result => (new Courses.SetFilterSuccess({ ...result, filter, pageIndex: 1 }))),
            catchError(error => of(new Courses.SetFilterFail({ error })))
          );
      })
    );

  @Effect()
  getCourseList$ = this.actions$
    .pipe(
      ofType<Courses.GetCourseList>(Courses.ActionTypes.GetCourseList),
      withLatestFrom(this.coursesStore.select(getCoursesState)),
      mergeMap(([ action, coursesState ]) => {
        return this.coursesService.getAll(0, coursesState.coursesPerPage)
          .pipe(
            map(result => (new Courses.GetCourseListSuccess({ ...result }))),
            catchError(error => of(new Courses.GetCourseListFail({ error })))
          );
      })
    );

  @Effect()
  deleteCourse$ = this.actions$
    .pipe(
      ofType<Courses.DeleteCourse>(Courses.ActionTypes.DeleteCourse),
      mergeMap(action => {
        this.loadingService.show();
        return this.coursesService.delete(action.payload.courseId)
          .pipe(
            withLatestFrom(this.coursesStore.select(getCoursesState)),
            mergeMap(([ res, coursesState ]) => {
              this.loadingService.hide();
              return this.coursesService.getAll(0, coursesState.coursesPerPage, coursesState.filter)
                .pipe(
                  map(result => (new Courses.DeleteCourseSuccess({ ...result, pageIndex: 1 })))
                );
              }
            ),
            catchError(error => of(new Courses.DeleteCourseFail({ error })))
          );
      })
    );

  constructor(
    private actions$: Actions,
    private coursesStore: Store<CoursesListState>,
    private coursesService: CoursesService,
    private loadingService: LoadingService
  ) {}
}
