import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupblockComponent } from './groupblock.component';

describe('GroupblockComponent', () => {
  let component: GroupblockComponent;
  let fixture: ComponentFixture<GroupblockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupblockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupblockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
