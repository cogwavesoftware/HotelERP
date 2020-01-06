import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashtabsComponent } from './dashtabs.component';

describe('DashtabsComponent', () => {
  let component: DashtabsComponent;
  let fixture: ComponentFixture<DashtabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashtabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashtabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
