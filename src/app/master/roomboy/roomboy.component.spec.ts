import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomboyComponent } from './roomboy.component';

describe('RoomboyComponent', () => {
  let component: RoomboyComponent;
  let fixture: ComponentFixture<RoomboyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomboyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomboyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
