import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostchargeComponent } from './postcharge.component';

describe('PostchargeComponent', () => {
  let component: PostchargeComponent;
  let fixture: ComponentFixture<PostchargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostchargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostchargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
