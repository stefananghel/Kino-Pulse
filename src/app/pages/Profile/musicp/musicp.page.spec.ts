import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MusicpPage } from './musicp.page';

describe('MusicpPage', () => {
  let component: MusicpPage;
  let fixture: ComponentFixture<MusicpPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
