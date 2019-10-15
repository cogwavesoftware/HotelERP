import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomtypecreationComponent } from './roomtypecreation.component';

describe('RoomtypecreationComponent', () => {
  let component: RoomtypecreationComponent;
  let fixture: ComponentFixture<RoomtypecreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomtypecreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomtypecreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
