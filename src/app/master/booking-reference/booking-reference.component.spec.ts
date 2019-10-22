import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingReferenceComponent } from './booking-reference.component';

describe('BookingReferenceComponent', () => {
  let component: BookingReferenceComponent;
  let fixture: ComponentFixture<BookingReferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingReferenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingReferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
