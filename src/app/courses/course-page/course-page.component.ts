import { Component, OnInit } from '@angular/core';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss']
})
export class CoursePageComponent implements OnInit {

  faCalendar = faCalendar;
  duration = 0;

  constructor(
    private router: Router
  ) { }

  save() {
    this.router.navigate(['/courses']);
  }

  cancel() {
    this.router.navigate(['/courses']);
  }

  ngOnInit() {
  }

}
