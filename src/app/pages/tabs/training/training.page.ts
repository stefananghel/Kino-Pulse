import { Component, OnInit } from '@angular/core';
import { ProgramsService } from '../../../services/programs.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-training',
  templateUrl: './training.page.html',
  styleUrls: ['./training.page.scss'],
})
export class TrainingPage implements OnInit {
  public buffer = 0.06;
  public progress = 0;

  programs: any;

  constructor(private modal: ModalController, public programsService: ProgramsService) {
  }

  close() {
    this.modal.dismiss();
  }

  ngOnInit() {
    this.programsService.fetchPrograms().then(data => {
      console.log("data");
      console.log(data);
      this.programs = data;
    }).catch(error => {
      console.error('Error fetching programs:', error);
    });
  }
}
