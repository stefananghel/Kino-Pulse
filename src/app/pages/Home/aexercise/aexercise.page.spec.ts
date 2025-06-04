import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AexercisePage } from './aexercise.page';

describe('AexercisePage', () => {
  let component: AexercisePage;
  let fixture: ComponentFixture<AexercisePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AexercisePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
