import { Component, OnInit } from '@angular/core';
import { CourseModel } from '../course.model';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
})
export class CoursesPageComponent implements OnInit {

  textToSearch = '';
  public courses: CourseModel[] = [];

  search() {
    console.log(this.textToSearch);
  }

  loadMore() {
    console.log('Start to load more…');
  }

  onCourseDelete(courseId) {
    this.courses = this.courses.filter(course => !course.id.equals(courseId));
  }

  constructor() { }

  ngOnInit() {
    for (let i = 1; i <= 10; i++) {
      this.courses.push(new CourseModel({
        title: `Course ${i} title`,
        creationDate: new Date(Math.random() * 5000000000000),
        duration: i * 1000,
        description: [`Course ${i} description`]
      }));
    }
  }

}
