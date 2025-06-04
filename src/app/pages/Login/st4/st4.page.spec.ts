import { ComponentFixture, TestBed } from '@angular/core/testing';
import { St4Page } from './st4.page';

describe('St4Page', () => {
  let component: St4Page;
  let fixture: ComponentFixture<St4Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(St4Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
