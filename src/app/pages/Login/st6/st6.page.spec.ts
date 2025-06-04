import { ComponentFixture, TestBed } from '@angular/core/testing';
import { St6Page } from './st6.page';

describe('St6Page', () => {
  let component: St6Page;
  let fixture: ComponentFixture<St6Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(St6Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
