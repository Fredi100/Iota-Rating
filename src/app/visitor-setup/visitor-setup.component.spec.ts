import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorSetupComponent } from './visitor-setup.component';

describe('VisitorSetupComponent', () => {
  let component: VisitorSetupComponent;
  let fixture: ComponentFixture<VisitorSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitorSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
