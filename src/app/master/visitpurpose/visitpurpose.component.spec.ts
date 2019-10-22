import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitpurposeComponent } from './visitpurpose.component';

describe('VisitpurposeComponent', () => {
  let component: VisitpurposeComponent;
  let fixture: ComponentFixture<VisitpurposeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitpurposeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitpurposeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
