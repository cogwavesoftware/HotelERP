import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomgridComponent } from './roomgrid.component';

describe('RoomgridComponent', () => {
  let component: RoomgridComponent;
  let fixture: ComponentFixture<RoomgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
