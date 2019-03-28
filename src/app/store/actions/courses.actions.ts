import { Action } from '@ngrx/store';
import { Guid } from 'guid-typescript';

import { CourseModel } from '../../courses/course.model';

export enum ActionTypes {
  GetCourseList        = '[CourseList] Get',
  GetCourseListSuccess = '[CourseList] Get Success',
  GetCourseListFail    = '[CourseList] Get Fail',

  AddCourse            = '[CourseList] Add Course',
  AddCourseSuccess     = '[CourseList] Add Course Success',
  AddCourseFail        = '[CourseList] Add Course Fail',

  UpdateCourse         = '[CourseList] Update Course',
  UpdateCourseSuccess  = '[CourseList] Update Course Success',
  UpdateCourseFail     = '[CourseList] Update Course Fail',

  DeleteCourse         = '[CourseList] Delete Course',
  DeleteCourseSuccess  = '[CourseList] Delete Course Success',
  DeleteCourseFail     = '[CourseList] Delete Course Fail',

  GoToPage             = '[CourseList] Go To Page',
  GoToPageSuccess      = '[CourseList] Go To Page Success',
  GoToPageFail         = '[CourseList] Go To Page Fail',

  SetFilter            = '[CourseList] Set Filter',
  SetFilterSuccess     = '[CourseList] Set Filter Success',
  SetFilterFail        = '[CourseList] Set Filter Fail'
}

export type ActionsUnions =
  GetCourseList |
  GetCourseListSuccess |
  GetCourseListFail |

  AddCourse |
  AddCourseSuccess |
  AddCourseFail |

  UpdateCourse |
  UpdateCourseSuccess |
  UpdateCourseFail |

  DeleteCourse |
  DeleteCourseSuccess |
  DeleteCourseFail |

  GoToPage |
  GoToPageSuccess |
  GoToPageFail |

  SetFilter |
  SetFilterSuccess |
  SetFilterFail;

export class GetCourseList implements Action {
  readonly type = ActionTypes.GetCourseList;
}

export class GetCourseListSuccess implements Action {
  readonly type = ActionTypes.GetCourseListSuccess;

  constructor(
    public payload: {
      courses: CourseModel[],
      totalCount: number,
      pageIndex?: number,
      filter?: string
    }
  ) {}
}

export class GetCourseListFail implements Action {
  readonly type = ActionTypes.GetCourseListFail;

  constructor(public payload: { error }) {}
}

export class AddCourse implements Action {
  readonly type = ActionTypes.AddCourse;

  constructor(public payload: { course: CourseModel }) {}
}

export class AddCourseSuccess implements Action {
  readonly type = ActionTypes.AddCourseSuccess;

  constructor(
    public payload: {
      courses: CourseModel[],
      totalCount: number,
      pageIndex?: number,
      filter?: string
    }
  ) {}
}

export class AddCourseFail implements Action {
  readonly type = ActionTypes.AddCourseFail;

  constructor(public payload: { error }) {}
}

export class UpdateCourse implements Action {
  readonly type = ActionTypes.UpdateCourse;

  constructor(public payload: { courseId: Guid, obj: any }) {}
}

export class UpdateCourseSuccess implements Action {
  readonly type = ActionTypes.UpdateCourseSuccess;

  constructor(
    public payload: {
      courses: CourseModel[],
      totalCount: number,
      pageIndex?: number,
      filter?: string
    }
  ) {}
}

export class UpdateCourseFail implements Action {
  readonly type = ActionTypes.UpdateCourseFail;

  constructor(public payload: { error }) {}
}

export class DeleteCourse implements Action {
  readonly type = ActionTypes.DeleteCourse;

  constructor(public payload: { courseId: Guid }) {}
}

export class DeleteCourseSuccess implements Action {
  readonly type = ActionTypes.DeleteCourseSuccess;

  constructor(
    public payload: {
      courses: CourseModel[],
      totalCount: number,
      pageIndex?: number,
      filter?: string
    }
  ) {}
}

export class DeleteCourseFail implements Action {
  readonly type = ActionTypes.DeleteCourseFail;

  constructor(public payload: { error }) {}
}

export class GoToPage implements Action {
  readonly type = ActionTypes.GoToPage;

  constructor(public payload: { pageIndex: number }) {}
}

export class GoToPageSuccess implements Action {
  readonly type = ActionTypes.GoToPageSuccess;

  constructor(
    public payload: {
      courses: CourseModel[],
      totalCount: number,
      pageIndex: number,
      filter?: string
    }
  ) {}
}

export class GoToPageFail implements Action {
  readonly type = ActionTypes.GoToPageFail;

  constructor(public payload: { error }) {}
}

export class SetFilter implements Action {
  readonly type = ActionTypes.SetFilter;

  constructor(public payload: { filter: string }) {}
}

export class SetFilterSuccess implements Action {
  readonly type = ActionTypes.SetFilterSuccess;

  constructor(
    public payload: {
      courses: CourseModel[],
      totalCount: number,
      pageIndex?: number,
      filter: string
    }
  ) {}
}

export class SetFilterFail implements Action {
  readonly type = ActionTypes.SetFilterFail;

  constructor(public payload: { error }) {}
}
