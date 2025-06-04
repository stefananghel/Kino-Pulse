import { ComponentFixture, TestBed } from '@angular/core/testing';
import { St3Page } from './st3.page';

describe('St3Page', () => {
  let component: St3Page;
  let fixture: ComponentFixture<St3Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(St3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
