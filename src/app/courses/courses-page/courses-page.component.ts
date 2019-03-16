import { Component, OnInit, ViewChild } from '@angular/core';
import { CourseModel } from '../course.model';
import { CoursesService } from '../../services/courses/courses.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { BreadCrumb } from '../breadcrumbs/breadcrumbs.component';
import * as _ from 'lodash';
import { Observable } from 'rxjs';

const COURSES_PER_PAGE = 5;
const DEBOUNCE_TIME = 1000;

class Page {
  public index = 0;
  constructor (index) {
    this.index = index;
  }
}

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
})
export class CoursesPageComponent implements OnInit {

  textToSearch = '';
  public currentPageIndex = 1;
  public totalCount = 0;
  public courses: CourseModel[] = [];
  breadCrumbs: BreadCrumb[] = [{
    link: null,
    title: 'Courses'
  }];
  @ViewChild('modalView') private modalView;
  public onSearchChanged: () => void;

  public search = Observable.create((observer) => {
    this.onSearchChanged = _.debounce(() => {
      if (this.textToSearch === '' || this.textToSearch.length > 3) {
        observer.next(this.textToSearch);
      }
    }, DEBOUNCE_TIME);
  });

  public get pages() {
    const pagesCount = Math.ceil(this.totalCount / COURSES_PER_PAGE);
    return _.times(pagesCount, index => new Page(index + 1));
  }

  goTo(page: Page, filter?: string) {
    const start = COURSES_PER_PAGE * (page.index - 1);
    this.courseService.getAll(start, COURSES_PER_PAGE, filter).subscribe(result => {
      const { courses, totalCount } = result;
      this.courses = courses;
      this.totalCount = totalCount;
      this.currentPageIndex = page.index;
    });
  }

  addCourse() {
    this.router.navigate(['/courses/new']);
  }

  onCourseDelete(courseId) {
    this.modalService
      .open(this.modalView)
      .result
      .then(() => {
        this.courseService.delete(courseId).finally(
          () => {
            this.goTo(new Page(1));
          }
        );
      }, () => {});
  }

  constructor(
    private courseService: CoursesService,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.goTo(new Page(1));
    this.search.subscribe((filter) => {
      this.goTo(new Page(1), filter);
    });
  }

}
