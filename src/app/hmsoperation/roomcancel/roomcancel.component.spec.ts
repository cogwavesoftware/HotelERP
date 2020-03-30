import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomcancelComponent } from './roomcancel.component';

describe('RoomcancelComponent', () => {
  let component: RoomcancelComponent;
  let fixture: ComponentFixture<RoomcancelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomcancelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomcancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
