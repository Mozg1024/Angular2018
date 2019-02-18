import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursePlateComponent } from './course-plate.component';
import { CourseModel } from '../course.model';
import { By } from '@angular/platform-browser';

describe('CoursePlateComponent', () => {
  let component: CoursePlateComponent;
  let fixture: ComponentFixture<CoursePlateComponent>;
  let deleteButton;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursePlateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursePlateComponent);
    component = fixture.componentInstance;
    component.course = new CourseModel({
      title: 'title',
      creationDate: new Date('01/01/2019'),
      duration: 1000,
      topRated: true,
      description: ['description']
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Delete button', () => {
    beforeEach(() => {
      deleteButton = fixture.debugElement.query(By.css('.delete-button'));
    });

    it('should call deleteCourse method', () => {
      component.deleteCourse = jasmine.createSpy('deleteCourse');
      deleteButton.triggerEventHandler('click', null);

      expect(component.deleteCourse).toHaveBeenCalled();
    });

    it('should raise delete', () => {
      let deletedCourseId;
      component.delete.subscribe(courseId => deletedCourseId = courseId);

      deleteButton.triggerEventHandler('click', null);

      expect(deletedCourseId).toBe(component.course.id);
    });
  });
});
