import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwaresetupComponent } from './softwaresetup.component';

describe('SoftwaresetupComponent', () => {
  let component: SoftwaresetupComponent;
  let fixture: ComponentFixture<SoftwaresetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoftwaresetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoftwaresetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
