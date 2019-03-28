import { Component, forwardRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Author } from '../author.model';
import { MultiSelectComponent } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AuthorsComponent),
      multi: true
    }
  ]
})
export class AuthorsComponent implements ControlValueAccessor {

  public dropDownOpen = false;

  @ViewChild(MultiSelectComponent)
  set multiSelectComponent(multiSelect: MultiSelectComponent) {
    setTimeout(() => {
      Object.defineProperty(multiSelect._settings, 'defaultOpen', {
        get: () => this.dropDownOpen,
        set: (value) => {
          if (value !== this.dropDownOpen) {
            this.onTouched();
          }
          this.dropDownOpen = value;
        }
      });
    }, 0);
  }

  @Input() authorsList: Author[];

  private _authors: Author[] = [];

  get authors(): Author[] {
    return this._authors;
  }

  set authors(value: Author[]) {
    this._authors = value;
    this.onChange(this._authors);
  }

  dropdownSettings = {};

  constructor() {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  onChange = (authors: Author[]) => {};
  onTouched = () => {};

  writeValue(authors: Author[]): void {
    this._authors = authors;
    this.onChange(this.authors);
  }

  registerOnChange(fn: (authors: Author[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
