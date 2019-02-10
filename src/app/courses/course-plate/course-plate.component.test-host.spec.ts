import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursePlateComponent } from './course-plate.component';
import { CourseModel } from '../course.model';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { Guid } from 'guid-typescript';

@Component({
  template: `
    <app-course-plate
      [course]="course"
      (delete)="onCourseDelete($event)">
    </app-course-plate>`
})

class TestHostComponent {
  public course = new CourseModel({
    title: 'title',
    creationDate: new Date('01/01/2019'),
    duration: 1000,
    topRated: true,
    description: ['description']
  });
  public deletedCourseId: Guid;
  public onCourseDelete(courseId: Guid) { this.deletedCourseId = courseId; }
}

describe('CoursePlateComponent into test host', () => {
  let testHost: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CoursePlateComponent,
        TestHostComponent,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should raise delete', () => {
    const deleteButton = fixture.debugElement.query(By.css('.delete-button'));

    deleteButton.triggerEventHandler('click', null);

    expect(testHost.deletedCourseId).toBe(testHost.course.id);
  });
});
