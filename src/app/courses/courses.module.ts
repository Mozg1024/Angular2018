import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesPageComponent } from './courses-page/courses-page.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';

@NgModule({
  declarations: [
    CoursesPageComponent,
    BreadcrumbsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CoursesPageComponent
  ]
})
export class CoursesModule { }
