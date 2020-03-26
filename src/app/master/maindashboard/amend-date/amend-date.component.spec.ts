import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmendDateComponent } from './amend-date.component';

describe('AmendDateComponent', () => {
  let component: AmendDateComponent;
  let fixture: ComponentFixture<AmendDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmendDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmendDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
