import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-duration',
  templateUrl: './duration.component.html',
  styleUrls: ['./duration.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DurationComponent),
      multi: true
    }
  ]
})
export class DurationComponent implements ControlValueAccessor {

  onChange = (duration: number) => {};
  onTouched = () => {};
  duration = 0;

  constructor() { }

  writeValue(duration: number): void {
    this.duration = duration;
    this.onChange(this.duration)
  }

  registerOnChange(fn: (duration: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onChanged(event) {
    const newValue = +event.target.value;
    if (_.isNumber(newValue) && newValue >= 0) {
      this.writeValue(newValue);
    } else {
      event.target.value = this.duration;
    }
  }

}
