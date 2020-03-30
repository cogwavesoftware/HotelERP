import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancetransferComponent } from './advancetransfer.component';

describe('AdvancetransferComponent', () => {
  let component: AdvancetransferComponent;
  let fixture: ComponentFixture<AdvancetransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvancetransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancetransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
