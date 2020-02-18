import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RescheckinComponent } from './rescheckin.component';

describe('RescheckinComponent', () => {
  let component: RescheckinComponent;
  let fixture: ComponentFixture<RescheckinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RescheckinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RescheckinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
