import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayarivallistComponent } from './todayarivallist.component';

describe('TodayarivallistComponent', () => {
  let component: TodayarivallistComponent;
  let fixture: ComponentFixture<TodayarivallistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodayarivallistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodayarivallistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
