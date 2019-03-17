import * as _ from 'lodash';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as Courses from '../actions/courses.actions';
import { CourseModel } from '../../courses/course.model';

export class Page {
  public index = 0;
  constructor (index) {
    this.index = index;
  }
}

export interface CoursesListState {
  filter: string;
  courses: CourseModel[];
  coursesPerPage: number;
  pages: Page[];
  currentPageIndex: number;
  inProgress: boolean;
}

export const initialState: CoursesListState = {
  filter: '',
  courses: [],
  coursesPerPage: 5,
  pages: [],
  currentPageIndex: 1,
  inProgress: false
};

export function coursesReducer(state = initialState, action: Courses.ActionsUnions): CoursesListState {
  switch (action.type) {

    case Courses.ActionTypes.GetCourseList:
    case Courses.ActionTypes.AddCourse:
    case Courses.ActionTypes.UpdateCourse:
    case Courses.ActionTypes.DeleteCourse:
    case Courses.ActionTypes.GoToPage:
    case Courses.ActionTypes.SetFilter:
      return {
        ...state,
        inProgress: true
      };

    case Courses.ActionTypes.GetCourseListSuccess:
    case Courses.ActionTypes.AddCourseSuccess:
    case Courses.ActionTypes.UpdateCourseSuccess:
    case Courses.ActionTypes.DeleteCourseSuccess:
    case Courses.ActionTypes.GoToPageSuccess:
    case Courses.ActionTypes.SetFilterSuccess:
      const pagesCount = Math.ceil(action.payload.totalCount / state.coursesPerPage);
      const pages = _.times(pagesCount, index => new Page(index + 1));
      return {
        ...state,
        pages,
        courses: action.payload.courses,
        currentPageIndex: _.isUndefined(action.payload.pageIndex) ? state.currentPageIndex : action.payload.pageIndex,
        filter: _.isUndefined(action.payload.filter) ? state.filter : action.payload.filter,
        inProgress: false
      };

    case Courses.ActionTypes.GetCourseListFail:
    case Courses.ActionTypes.AddCourseFail:
    case Courses.ActionTypes.UpdateCourseFail:
    case Courses.ActionTypes.DeleteCourseFail:
    case Courses.ActionTypes.GoToPageFail:
    case Courses.ActionTypes.SetFilterFail:
      return {
        ...state,
        inProgress: false
      };

    default:
      return state;
  }
}

export const getCoursesState = createFeatureSelector<CoursesListState>(
  'courses'
);

export const getCourses = createSelector(
  getCoursesState,
  (state: CoursesListState) => state.courses
);

export const getPages = createSelector(
  getCoursesState,
  (state: CoursesListState) => state.pages
);

export const getCurrentPageIndex = createSelector(
  getCoursesState,
  (state: CoursesListState) => state.currentPageIndex
);
