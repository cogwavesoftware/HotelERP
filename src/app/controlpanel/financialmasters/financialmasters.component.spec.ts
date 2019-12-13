import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialmastersComponent } from './financialmasters.component';

describe('FinancialmastersComponent', () => {
  let component: FinancialmastersComponent;
  let fixture: ComponentFixture<FinancialmastersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialmastersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialmastersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
