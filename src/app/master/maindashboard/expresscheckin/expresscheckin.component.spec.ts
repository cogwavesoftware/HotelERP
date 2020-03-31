import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpresscheckinComponent } from './expresscheckin.component';

describe('ExpresscheckinComponent', () => {
  let component: ExpresscheckinComponent;
  let fixture: ComponentFixture<ExpresscheckinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpresscheckinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpresscheckinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
