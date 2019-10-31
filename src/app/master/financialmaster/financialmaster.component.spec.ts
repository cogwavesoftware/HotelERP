import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialmasterComponent } from './financialmaster.component';

describe('FinancialmasterComponent', () => {
  let component: FinancialmasterComponent;
  let fixture: ComponentFixture<FinancialmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
