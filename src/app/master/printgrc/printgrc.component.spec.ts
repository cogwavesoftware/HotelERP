import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintgrcComponent } from './printgrc.component';

describe('PrintgrcComponent', () => {
  let component: PrintgrcComponent;
  let fixture: ComponentFixture<PrintgrcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintgrcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintgrcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
