import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanycreationComponent } from './companycreation.component';

describe('CompanycreationComponent', () => {
  let component: CompanycreationComponent;
  let fixture: ComponentFixture<CompanycreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanycreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanycreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
