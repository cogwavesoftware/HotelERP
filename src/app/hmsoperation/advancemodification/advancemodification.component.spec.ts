import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancemodificationComponent } from './advancemodification.component';

describe('AdvancemodificationComponent', () => {
  let component: AdvancemodificationComponent;
  let fixture: ComponentFixture<AdvancemodificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvancemodificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancemodificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
