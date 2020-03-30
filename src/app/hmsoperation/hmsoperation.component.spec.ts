import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HmsoperationComponent } from './hmsoperation.component';

describe('HmsoperationComponent', () => {
  let component: HmsoperationComponent;
  let fixture: ComponentFixture<HmsoperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HmsoperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HmsoperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
