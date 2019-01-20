import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursePlateComponent } from './course-plate.component';
import { CourseModel } from '../course.model';

describe('CoursePlateComponent', () => {
  let component: CoursePlateComponent;
  let fixture: ComponentFixture<CoursePlateComponent>;

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
      description: ['description']
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
