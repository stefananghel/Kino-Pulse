import { ComponentFixture, TestBed } from '@angular/core/testing';
import { St5Page } from './st5.page';

describe('St5Page', () => {
  let component: St5Page;
  let fixture: ComponentFixture<St5Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(St5Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
