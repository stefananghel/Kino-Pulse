import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyworkoutPage } from './myworkout.page';

describe('MyworkoutPage', () => {
  let component: MyworkoutPage;
  let fixture: ComponentFixture<MyworkoutPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MyworkoutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
