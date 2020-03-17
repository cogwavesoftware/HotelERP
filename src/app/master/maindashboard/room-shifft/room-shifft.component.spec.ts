import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomShifftComponent } from './room-shifft.component';

describe('RoomShifftComponent', () => {
  let component: RoomShifftComponent;
  let fixture: ComponentFixture<RoomShifftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomShifftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomShifftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
