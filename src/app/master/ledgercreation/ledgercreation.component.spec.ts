import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LedgercreationComponent } from './ledgercreation.component';

describe('LedgercreationComponent', () => {
  let component: LedgercreationComponent;
  let fixture: ComponentFixture<LedgercreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LedgercreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LedgercreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
