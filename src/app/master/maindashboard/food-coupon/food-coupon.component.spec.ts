import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodCouponComponent } from './food-coupon.component';

describe('FoodCouponComponent', () => {
  let component: FoodCouponComponent;
  let fixture: ComponentFixture<FoodCouponComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodCouponComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
