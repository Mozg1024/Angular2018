import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CourseModel } from '../course.model';
import { Guid } from 'guid-typescript';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-course-plate',
  templateUrl: './course-plate.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./course-plate.component.scss']
})
export class CoursePlateComponent implements OnInit {

  @Input() course: CourseModel;
  @Output() delete = new EventEmitter<Guid>();

  faStar = faStar;

  deleteCourse() {
    this.delete.emit(this.course.id);
  }

  constructor() {
  }

  ngOnInit() {
  }

}
