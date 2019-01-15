import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CourseModel } from '../course.model';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-course-plate',
  templateUrl: './course-plate.component.html',
  styleUrls: ['./course-plate.component.scss']
})
export class CoursePlateComponent implements OnInit {

  @Input() course: CourseModel;
  @Output() delete = new EventEmitter<Guid>();

  deleteCourse() {
    this.delete.emit(this.course.id);
  }

  constructor() {
  }

  ngOnInit() {
  }

}
