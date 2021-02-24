import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestinformationComponent } from './guestinformation.component';

describe('GuestinformationComponent', () => {
  let component: GuestinformationComponent;
  let fixture: ComponentFixture<GuestinformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestinformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestinformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
