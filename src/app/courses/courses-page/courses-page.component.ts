import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
})
export class CoursesPageComponent implements OnInit {

  textToSearch = '';

  search() {
    console.log(this.textToSearch);
  }

  constructor() { }

  ngOnInit() {
  }

}
