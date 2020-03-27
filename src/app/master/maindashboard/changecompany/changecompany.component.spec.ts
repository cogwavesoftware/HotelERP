import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangecompanyComponent } from './changecompany.component';

describe('ChangecompanyComponent', () => {
  let component: ChangecompanyComponent;
  let fixture: ComponentFixture<ChangecompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangecompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangecompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
