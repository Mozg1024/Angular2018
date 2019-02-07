import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDuration'
})
export class FormatDurationPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const minutes = Math.floor(value % 60);
    const hours = Math.floor(value / 60);
    const onlyMinutes = hours === 0;
    const minutesLeadingZero = (minutes < 10) && !onlyMinutes;
    return (onlyMinutes ? '' : `${hours}h `) +
           (minutesLeadingZero ? '0' : '') + `${minutes}min`;
  }

}
