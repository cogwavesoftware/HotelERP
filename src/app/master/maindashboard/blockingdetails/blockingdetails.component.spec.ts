import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockingdetailsComponent } from './blockingdetails.component';

describe('BlockingdetailsComponent', () => {
  let component: BlockingdetailsComponent;
  let fixture: ComponentFixture<BlockingdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockingdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockingdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
