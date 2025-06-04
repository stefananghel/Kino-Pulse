import { ComponentFixture, TestBed } from '@angular/core/testing';
import { St7Page } from './st7.page';

describe('St7Page', () => {
  let component: St7Page;
  let fixture: ComponentFixture<St7Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(St7Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
