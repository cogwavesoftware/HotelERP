import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlancreationComponent } from './plancreation.component';

describe('PlancreationComponent', () => {
  let component: PlancreationComponent;
  let fixture: ComponentFixture<PlancreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlancreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlancreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
