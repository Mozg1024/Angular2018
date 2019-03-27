import { Component, OnInit } from '@angular/core';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { CourseModel } from '../course.model';
import { CoursesService } from '../../services/courses/courses.service';
import { BreadCrumb } from '../breadcrumbs/breadcrumbs.component';
import { CoursesListState } from '../../store/reducers/courses.reducer';
import { AddCourse, UpdateCourse } from '../../store/actions/courses.actions';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss']
})
export class CoursePageComponent implements OnInit {

  faCalendar = faCalendar;
  course: CourseModel;
  courseForm = new FormGroup({
    duration: new FormControl(0, [
      Validators.required,
      Validators.pattern(/^\d*$/)
    ]),
    title: new FormControl('', [
      Validators.required,
      Validators.maxLength(50)
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.maxLength(500)
    ]),
    date: new FormControl('', [
      Validators.required
    ]),
    authors: new FormControl('', [
      Validators.required
    ])
  });

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
    this.courseForm.setValue({
      title: this.course.title,
      description: this.course.description.join('\n'),
      date: {
        year: this.course.creationDate.getFullYear(),
        month: this.course.creationDate.getMonth() + 1,
        day: this.course.creationDate.getDate(),
      },
      duration: this.course.duration,
      authors: ''
    });

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
    this.course.title = this.courseForm.controls.title.value;
    this.course.description = this.courseForm.controls.description.value.split('\n');
    this.course.creationDate = new Date(
      this.courseForm.controls.date.value.year,
      this.courseForm.controls.date.value.month - 1,
      this.courseForm.controls.date.value.day
    );
    this.course.duration = this.courseForm.controls.duration.value;
  }

}
