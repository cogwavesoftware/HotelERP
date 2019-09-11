import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonpageComponent } from './commonpage.component';

describe('CommonpageComponent', () => {
  let component: CommonpageComponent;
  let fixture: ComponentFixture<CommonpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
