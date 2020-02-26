import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CamarawindowComponent } from './camarawindow.component';

describe('CamarawindowComponent', () => {
  let component: CamarawindowComponent;
  let fixture: ComponentFixture<CamarawindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CamarawindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CamarawindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
