import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BanknameComponent } from './bankname.component';

describe('BanknameComponent', () => {
  let component: BanknameComponent;
  let fixture: ComponentFixture<BanknameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BanknameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BanknameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
