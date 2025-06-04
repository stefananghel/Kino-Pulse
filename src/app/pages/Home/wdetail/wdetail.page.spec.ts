import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WdetailPage } from './wdetail.page';
import {ProgramsService} from "../../../services/programs.service";

describe('WdetailPage', () => {
  let component: WdetailPage;
  let fixture: ComponentFixture<WdetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WdetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
