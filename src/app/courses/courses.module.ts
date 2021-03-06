import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CoursesPageComponent } from './courses-page/courses-page.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { CoursePlateComponent } from './course-plate/course-plate.component';
import { HighlightBorderDirective } from '../directives/highlight-border/highlight-border.directive';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormatDurationPipe } from '../pipes/formatDuration/format-duration.pipe';
import { OrderByDatePipe } from '../pipes/orderByDate/order-by-date.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterPipe } from '../pipes/filter/filter.pipe';
import { CoursePageComponent } from './course-page/course-page.component';
import { RouterModule } from '@angular/router';
import { DurationComponent } from './duration/duration.component';
import { AuthorsComponent } from './authors/authors.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [
    CoursesPageComponent,
    BreadcrumbsComponent,
    HighlightBorderDirective,
    FilterPipe,
    FormatDurationPipe,
    OrderByDatePipe,
    CoursePageComponent,
    CoursePlateComponent,
    AuthorsComponent,
    DurationComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgbModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  exports: [
    CoursesPageComponent
  ]
})
export class CoursesModule { }
