import { Component, OnInit, ViewChild } from '@angular/core';
import { CourseModel } from '../course.model';
import { FilterPipe } from '../../pipes/filter/filter.pipe';
import { CoursesService } from '../../services/courses/courses.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { BreadCrumb } from '../breadcrumbs/breadcrumbs.component';

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
  breadCrumbs: BreadCrumb[] = [{
    link: null,
    title: 'Courses'
  }];
  @ViewChild('modalView') private modalView;

  search() {
    this.filteredCourses = this.filterPipe.transform(this.courses, this.textToSearch);
  }

  loadMore() {
    console.log('Start to load more…');
  }

  addCourse() {
    this.router.navigate(['/courses/new']);
  }

  onCourseDelete(courseId) {
    this.modalService
      .open(this.modalView)
      .result
      .then(() => {
        this.courseService.delete(courseId);
        this.courses = this.courseService.getAll();
        this.filteredCourses = [...this.courses];
      }, () => {});
  }

  constructor(
    private courseService: CoursesService,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.courses = this.courseService.getAll();
    this.filteredCourses = [...this.courses];
  }

}
