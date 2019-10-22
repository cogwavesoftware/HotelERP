import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherTaxComponent } from './other-tax.component';

describe('OtherTaxComponent', () => {
  let component: OtherTaxComponent;
  let fixture: ComponentFixture<OtherTaxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherTaxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
