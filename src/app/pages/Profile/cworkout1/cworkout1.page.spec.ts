import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Cworkout1Page } from './cworkout1.page';

describe('Cworkout1Page', () => {
  let component: Cworkout1Page;
  let fixture: ComponentFixture<Cworkout1Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Cworkout1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
