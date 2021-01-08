import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoothManagerComponent } from './booth-manager.component';

describe('BoothManagerComponent', () => {
  let component: BoothManagerComponent;
  let fixture: ComponentFixture<BoothManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoothManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoothManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
