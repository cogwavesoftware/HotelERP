import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkReservationAdvanceComponent } from './link-reservation-advance.component';

describe('LinkReservationAdvanceComponent', () => {
  let component: LinkReservationAdvanceComponent;
  let fixture: ComponentFixture<LinkReservationAdvanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkReservationAdvanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkReservationAdvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
