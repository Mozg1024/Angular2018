import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CoursesPageComponent } from './courses-page/courses-page.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { CoursePlateComponent } from './course-plate/course-plate.component';
import { HighlightBorderDirective } from '../directives/highlight-border/highlight-border.directive';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormatDurationPipe } from '../pipes/formatDuration/format-duration.pipe';
import { OrderByDatePipe } from '../pipes/orderByDate/order-by-date.pipe';
import { CoursesService } from '../services/courses/courses.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterPipe } from '../pipes/filter/filter.pipe';

@NgModule({
  declarations: [
    CoursesPageComponent,
    BreadcrumbsComponent,
    HighlightBorderDirective,
    FilterPipe,
    FormatDurationPipe,
    OrderByDatePipe,
    CoursePlateComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgbModule,
    FormsModule
  ],
  providers: [
    CoursesService
  ],
  exports: [
    CoursesPageComponent
  ]
})
export class CoursesModule { }
