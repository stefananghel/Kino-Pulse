import { Component, OnInit } from '@angular/core';
import { ProgramsService } from '../../../services/programs.service';


@Component({
  selector: 'app-wdetail',
  templateUrl: './wdetail.page.html',
  styleUrls: ['./wdetail.page.scss'],
})
export class WdetailPage implements OnInit {
  program: any;

  constructor(public programsService: ProgramsService) { }

  ngOnInit() {
    const id = window.location.pathname.split('/').pop();
    if (id) {
      this.program = this.programsService.programs.find(program => program.id === +id);
    }
    console.log(this.program);
  }

}
