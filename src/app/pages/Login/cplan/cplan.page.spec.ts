import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CplanPage } from './cplan.page';

describe('CplanPage', () => {
  let component: CplanPage;
  let fixture: ComponentFixture<CplanPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CplanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
