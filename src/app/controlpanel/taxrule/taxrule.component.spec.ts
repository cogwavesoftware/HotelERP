import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxruleComponent } from './taxrule.component';

describe('TaxruleComponent', () => {
  let component: TaxruleComponent;
  let fixture: ComponentFixture<TaxruleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxruleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxruleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
