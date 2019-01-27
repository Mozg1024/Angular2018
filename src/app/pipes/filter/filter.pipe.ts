import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(courses: any, filter: string): any {
    return courses.filter(course => course.title.toUpperCase().includes(filter.toUpperCase()));
  }

}
