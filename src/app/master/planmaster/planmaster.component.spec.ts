import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanmasterComponent } from './planmaster.component';

describe('PlanmasterComponent', () => {
  let component: PlanmasterComponent;
  let fixture: ComponentFixture<PlanmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
