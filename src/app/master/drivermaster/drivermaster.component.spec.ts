import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrivermasterComponent } from './drivermaster.component';

describe('DrivermasterComponent', () => {
  let component: DrivermasterComponent;
  let fixture: ComponentFixture<DrivermasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrivermasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrivermasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
