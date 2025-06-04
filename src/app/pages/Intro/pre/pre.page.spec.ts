import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrePage } from './pre.page';

describe('PrePage', () => {
  let component: PrePage;
  let fixture: ComponentFixture<PrePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PrePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
