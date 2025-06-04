import { ComponentFixture, TestBed } from '@angular/core/testing';
import { St2Page } from './st2.page';

describe('St2Page', () => {
  let component: St2Page;
  let fixture: ComponentFixture<St2Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(St2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
