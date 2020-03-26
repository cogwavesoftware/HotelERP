import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoominstructionComponent } from './roominstruction.component';

describe('RoominstructionComponent', () => {
  let component: RoominstructionComponent;
  let fixture: ComponentFixture<RoominstructionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoominstructionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoominstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
