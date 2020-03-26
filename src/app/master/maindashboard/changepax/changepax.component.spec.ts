import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangepaxComponent } from './changepax.component';

describe('ChangepaxComponent', () => {
  let component: ChangepaxComponent;
  let fixture: ComponentFixture<ChangepaxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangepaxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangepaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
