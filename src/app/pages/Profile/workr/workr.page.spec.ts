import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkrPage } from './workr.page';

describe('WorkrPage', () => {
  let component: WorkrPage;
  let fixture: ComponentFixture<WorkrPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
