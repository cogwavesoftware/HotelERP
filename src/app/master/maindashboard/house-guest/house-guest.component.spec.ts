import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseGuestComponent } from './house-guest.component';

describe('HouseGuestComponent', () => {
  let component: HouseGuestComponent;
  let fixture: ComponentFixture<HouseGuestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseGuestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
