import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestcreationComponent } from './guestcreation.component';

describe('GuestcreationComponent', () => {
  let component: GuestcreationComponent;
  let fixture: ComponentFixture<GuestcreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestcreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestcreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
