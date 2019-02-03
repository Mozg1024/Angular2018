import { Component, OnInit } from '@angular/core';
import { CourseModel } from '../course.model';
import { FilterPipe } from '../../pipes/filter/filter.pipe';
import { CoursesService } from '../../services/courses/courses.service';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
})
export class CoursesPageComponent implements OnInit {

  textToSearch = '';
  filterPipe = new FilterPipe();
  public courses: CourseModel[] = [];
  public filteredCourses: CourseModel[] = [];

  search() {
    this.filteredCourses = this.filterPipe.transform(this.courses, this.textToSearch);
  }

  loadMore() {
    console.log('Start to load more…');
  }

  onCourseDelete(courseId) {
    this.courseService.delete(courseId);
    this.courses = this.courseService.getAll();
    this.filteredCourses = [...this.courses];
  }

  constructor(private courseService: CoursesService) { }

  ngOnInit() {
    this.courses = this.courseService.getAll();
    this.filteredCourses = [...this.courses];
  }

}
