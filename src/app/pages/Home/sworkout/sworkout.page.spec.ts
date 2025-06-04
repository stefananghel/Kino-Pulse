import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SworkoutPage } from './sworkout.page';

describe('SworkoutPage', () => {
  let component: SworkoutPage;
  let fixture: ComponentFixture<SworkoutPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SworkoutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
