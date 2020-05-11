import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancepostingComponent } from './advanceposting.component';

describe('AdvancepostingComponent', () => {
  let component: AdvancepostingComponent;
  let fixture: ComponentFixture<AdvancepostingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvancepostingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancepostingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
