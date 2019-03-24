import { Component, OnInit } from '@angular/core';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { CourseModel } from '../course.model';
import { CoursesService } from '../../services/courses/courses.service';
import { BreadCrumb } from '../breadcrumbs/breadcrumbs.component';
import { CoursesListState } from '../../store/reducers/courses.reducer';
import { AddCourse, UpdateCourse } from '../../store/actions/courses.actions';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss']
})
export class CoursePageComponent implements OnInit {

  faCalendar = faCalendar;
  course: CourseModel;
  duration = new FormControl();
  title = new FormControl();
  description = new FormControl();
  date = new FormControl();
  authors = new FormControl();
  breadCrumbs: BreadCrumb[] = [{
    link: null,
    title: 'Courses'
  }];
  isNewCourse = false;

  constructor(
    private coursesStore: Store<CoursesListState>,
    private courseService: CoursesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  save() {
    this.combineFieldsToModel();

    if (this.isNewCourse) {
      this.coursesStore.dispatch(new AddCourse({ course: this.course }));
    } else {
      this.coursesStore.dispatch(new UpdateCourse({ courseId: this.course.id, obj: this.course }));
    }

    this.router.navigate(['/courses']);
  }

  cancel() {
    this.router.navigate(['/courses']);
  }

  ngOnInit() {
    this.route.params.subscribe((data) => {
      const courseId = data['id'];
      if (courseId === 'new') {
        this.course = new CourseModel({});
        this.fillTemplateFields();
        this.isNewCourse = true;
      } else {
        this.courseService.getById(courseId).subscribe(
          course => {
            this.course = course;
            this.fillTemplateFields();
          },
          error => {
            console.log(error);
            this.router.navigate(['../404']);
          }
        );
      }
    });
  }

  fillTemplateFields() {
    this.title.setValue(this.course.title);
    this.description.setValue(this.course.description.join('\n'));
    this.date.setValue({
      year: this.course.creationDate.getFullYear(),
      month: this.course.creationDate.getMonth() + 1,
      day: this.course.creationDate.getDate(),
    });
    this.duration.setValue(this.course.duration);

    this.breadCrumbs = [
      {
        link: '/courses',
        title: 'Courses'
      },
      {
        link: null,
        title: this.course.title
      }
    ];
  }

  combineFieldsToModel() {
    this.course.title = this.title.value;
    this.course.description = this.description.value.split('\n');
    this.course.creationDate = new Date(this.date.value.year, this.date.value.month - 1, this.date.value.day);
    this.course.duration = this.duration.value;
  }

}
