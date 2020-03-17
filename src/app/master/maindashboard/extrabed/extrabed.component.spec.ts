import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtrabedComponent } from './extrabed.component';

describe('ExtrabedComponent', () => {
  let component: ExtrabedComponent;
  let fixture: ComponentFixture<ExtrabedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtrabedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtrabedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
