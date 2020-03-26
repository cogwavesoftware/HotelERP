import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseguestComponent } from './houseguest.component';

describe('HouseguestComponent', () => {
  let component: HouseguestComponent;
  let fixture: ComponentFixture<HouseguestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseguestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseguestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
