import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountportalComponent } from './discountportal.component';

describe('DiscountportalComponent', () => {
  let component: DiscountportalComponent;
  let fixture: ComponentFixture<DiscountportalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscountportalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountportalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
