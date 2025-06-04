import { ComponentFixture, TestBed } from '@angular/core/testing';
import { St1Page } from './st1.page';

describe('St1Page', () => {
  let component: St1Page;
  let fixture: ComponentFixture<St1Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(St1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
