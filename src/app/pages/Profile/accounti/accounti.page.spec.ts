import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountiPage } from './accounti.page';

describe('AccountiPage', () => {
  let component: AccountiPage;
  let fixture: ComponentFixture<AccountiPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
