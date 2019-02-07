import { Pipe, PipeTransform } from '@angular/core';
import { compareAsc } from 'date-fns';

@Pipe({
  name: 'orderByDate',
  pure: false
})
export class OrderByDatePipe implements PipeTransform {

  transform(courses: any, args?: any): any {
    return courses.sort((courseA, courseB) => compareAsc(courseA.creationDate, courseB.creationDate));
  }

}
