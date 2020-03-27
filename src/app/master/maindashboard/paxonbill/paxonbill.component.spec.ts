import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaxonbillComponent } from './paxonbill.component';

describe('PaxonbillComponent', () => {
  let component: PaxonbillComponent;
  let fixture: ComponentFixture<PaxonbillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaxonbillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaxonbillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
