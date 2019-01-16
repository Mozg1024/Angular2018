import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursePlateComponent } from './course-plate.component';

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
