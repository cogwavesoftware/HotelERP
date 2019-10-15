import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FloorcreationComponent } from './floorcreation.component';

describe('FloorcreationComponent', () => {
  let component: FloorcreationComponent;
  let fixture: ComponentFixture<FloorcreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FloorcreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloorcreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
