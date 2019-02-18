import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {

  @Input() paths: BreadCrumb[];

  constructor() { }

  ngOnInit() {
  }

}

export interface BreadCrumb {
  link: string | null;
  title: string;
}
