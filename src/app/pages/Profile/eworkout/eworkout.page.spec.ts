import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EworkoutPage } from './eworkout.page';

describe('EworkoutPage', () => {
  let component: EworkoutPage;
  let fixture: ComponentFixture<EworkoutPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EworkoutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
