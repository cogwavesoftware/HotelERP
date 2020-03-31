import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetcomplimentComponent } from './setcompliment.component';

describe('SetcomplimentComponent', () => {
  let component: SetcomplimentComponent;
  let fixture: ComponentFixture<SetcomplimentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetcomplimentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetcomplimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
