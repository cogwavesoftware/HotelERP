import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeguestComponent } from './changeguest.component';

describe('ChangeguestComponent', () => {
  let component: ChangeguestComponent;
  let fixture: ComponentFixture<ChangeguestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeguestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeguestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
