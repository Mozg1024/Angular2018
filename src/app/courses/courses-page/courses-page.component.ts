import * as _ from 'lodash';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { CourseModel } from '../course.model';
import { CoursesService } from '../../services/courses/courses.service';
import { BreadCrumb } from '../breadcrumbs/breadcrumbs.component';
import {
  CoursesListState,
  getCourses,
  getCurrentPageIndex,
  getPages,
  Page
} from '../../store/reducers/courses.reducer';
import {
  DeleteCourse,
  GetCourseList,
  GoToPage,
  SetFilter
} from '../../store/actions/courses.actions';

const DEBOUNCE_TIME = 1000;

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
})
export class CoursesPageComponent implements OnInit {

  public textToSearch = '';
  public courses$: Observable<CourseModel[]>;
  public pages$: Observable<Page[]>;
  public currentPageIndex$: Observable<number>;
  public breadCrumbs: BreadCrumb[] = [{
    link: null,
    title: 'Courses'
  }];
  @ViewChild('modalView') private modalView;
  public onSearchChanged: () => void;

  goTo(page: Page) {
    this.coursesStore.dispatch(new GoToPage({ pageIndex: page.index }));
  }

  addCourse() {
    this.router.navigate(['/courses/new']);
  }

  onCourseDelete(courseId) {
    this.modalService
      .open(this.modalView)
      .result
      .then(() => {
        this.coursesStore.dispatch(new DeleteCourse({ courseId }));
      }, () => {});
  }

  constructor(
    private coursesStore: Store<CoursesListState>,
    private courseService: CoursesService,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.courses$ = this.coursesStore.select(getCourses);
    this.pages$ = this.coursesStore.select(getPages);
    this.currentPageIndex$ = this.coursesStore.select(getCurrentPageIndex);

    this.onSearchChanged = _.debounce(() => {
      if (this.textToSearch === '' || this.textToSearch.length >= 3) {
        this.coursesStore.dispatch(new SetFilter({ filter: this.textToSearch }));
      }
    }, DEBOUNCE_TIME);
  }

  ngOnInit() {
    this.coursesStore.dispatch(new GetCourseList());
  }

}
