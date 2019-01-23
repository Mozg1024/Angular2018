import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesPageComponent } from './courses-page.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CourseModel } from '../course.model';
import { By } from '@angular/platform-browser';

describe('CoursesPageComponent', () => {
  let component: CoursesPageComponent;
  let fixture: ComponentFixture<CoursesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesPageComponent ],
      imports: [ FormsModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call search method', () => {
    component.search = jasmine.createSpy('search');
    const searchButton = fixture.debugElement.query(By.css('.search-button'));
    searchButton.triggerEventHandler('click', null);

    expect(component.search).toHaveBeenCalled();
  });

  it('should call loadMore method', () => {
    component.loadMore = jasmine.createSpy('loadMore');
    const loadMoreButton = fixture.debugElement.query(By.css('.load-more-button'));
    loadMoreButton.triggerEventHandler('click', null);

    expect(component.loadMore).toHaveBeenCalled();
  });

  describe('onCourseDelete', () => {
    const courseQuantity = 10;
    beforeEach(() => {
      component.courses = [];
      for (let i = 1; i <= courseQuantity; i++) {
        component.courses.push(new CourseModel({
          title: 'title',
          creationDate: new Date('01/01/2019'),
          duration: 1000,
          description: ['description']
        }));
      }
    });

    it('should delete course', () => {
      const firstCourseId = component.courses[0].id;
      component.onCourseDelete(firstCourseId);
      const isCourseInArray = component.courses.some(course => course.id.equals(firstCourseId));

      expect(component.courses.length).toBe(courseQuantity - 1);
      expect(isCourseInArray).toBeFalsy();
    });
  });
});
