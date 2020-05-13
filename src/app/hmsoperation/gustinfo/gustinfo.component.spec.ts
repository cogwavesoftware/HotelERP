import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GustinfoComponent } from './gustinfo.component';

describe('GustinfoComponent', () => {
  let component: GustinfoComponent;
  let fixture: ComponentFixture<GustinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GustinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GustinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
