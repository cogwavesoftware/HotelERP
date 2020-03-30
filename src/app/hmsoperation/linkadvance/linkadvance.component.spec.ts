import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkadvanceComponent } from './linkadvance.component';

describe('LinkadvanceComponent', () => {
  let component: LinkadvanceComponent;
  let fixture: ComponentFixture<LinkadvanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkadvanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkadvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
