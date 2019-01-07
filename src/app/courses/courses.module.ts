import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CoursesPageComponent } from './courses-page/courses-page.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';

@NgModule({
  declarations: [
    CoursesPageComponent,
    BreadcrumbsComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    CoursesPageComponent
  ]
})
export class CoursesModule { }
