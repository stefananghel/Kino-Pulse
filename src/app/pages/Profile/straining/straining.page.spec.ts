import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StrainingPage } from './straining.page';

describe('StrainingPage', () => {
  let component: StrainingPage;
  let fixture: ComponentFixture<StrainingPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StrainingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
