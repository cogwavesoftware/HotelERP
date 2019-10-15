import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomorganizerComponent } from './roomorganizer.component';

describe('RoomorganizerComponent', () => {
  let component: RoomorganizerComponent;
  let fixture: ComponentFixture<RoomorganizerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomorganizerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomorganizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
