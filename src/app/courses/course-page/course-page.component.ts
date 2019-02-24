import { Component, OnInit } from '@angular/core';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseModel } from '../course.model';
import { CoursesService } from '../../services/courses/courses.service';
import { BreadCrumb } from '../breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss']
})
export class CoursePageComponent implements OnInit {

  faCalendar = faCalendar;
  course: CourseModel;
  duration = 0;
  title = '';
  description = '';
  date = {
    year: 2018,
    month: 1,
    day: 1
  };
  authors = '';
  breadCrumbs: BreadCrumb[] = [{
    link: null,
    title: 'Courses'
  }];
  isNewCourse = false;

  constructor(
    private courseService: CoursesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  save() {
    this.course.title = this.title;
    this.course.description = this.description.split('\n');
    this.course.creationDate = new Date(this.date.year, this.date.month - 1, this.date.day);
    this.course.duration = this.duration;

    if (this.isNewCourse) {
      this.courseService.add(this.course);
    } else {
      this.courseService.update(this.course.id, this.course);
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
        this.isNewCourse = true;
      } else {
        this.course = this.courseService.getById(courseId);
      }

      if (!this.course) {
        this.router.navigate(['../404']);
      }

      this.title = this.course.title;
      this.description = this.course.description.join('\n');
      this.date = {
        year: this.course.creationDate.getFullYear(),
        month: this.course.creationDate.getMonth() + 1,
        day: this.course.creationDate.getDate(),
      };
      this.duration = this.course.duration;

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
    });
  }

}
