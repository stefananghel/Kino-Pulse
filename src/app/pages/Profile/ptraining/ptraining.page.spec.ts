import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PtrainingPage } from './ptraining.page';

describe('PtrainingPage', () => {
  let component: PtrainingPage;
  let fixture: ComponentFixture<PtrainingPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PtrainingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
