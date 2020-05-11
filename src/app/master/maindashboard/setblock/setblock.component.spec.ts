import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetblockComponent } from './setblock.component';

describe('SetblockComponent', () => {
  let component: SetblockComponent;
  let fixture: ComponentFixture<SetblockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetblockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetblockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
