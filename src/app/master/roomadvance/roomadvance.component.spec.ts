import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomadvanceComponent } from './roomadvance.component';

describe('RoomadvanceComponent', () => {
  let component: RoomadvanceComponent;
  let fixture: ComponentFixture<RoomadvanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomadvanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomadvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
