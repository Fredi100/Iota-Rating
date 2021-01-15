import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoothInfoComponent } from './booth-info.component';

describe('BoothInfoComponent', () => {
  let component: BoothInfoComponent;
  let fixture: ComponentFixture<BoothInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoothInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoothInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
