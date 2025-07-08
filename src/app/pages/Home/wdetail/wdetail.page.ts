import { Component, OnInit } from '@angular/core';
import { ProgramsService } from '../../../services/programs.service';
import { ModalController } from '@ionic/angular';
import { HomePage } from '../../tabs/home/home.page';
import { Camera } from '../../Profile/camera/camera.page';
import { ProgramDetailsService } from '../../../services/program-details.service';


@Component({
  selector: 'app-wdetail',
  templateUrl: './wdetail.page.html',
  styleUrls: ['./wdetail.page.scss'],
})
export class WdetailPage implements OnInit {
  program: any;

  constructor(private modal: ModalController, public programsService: ProgramsService, private programDetailsService: ProgramDetailsService) { }

  async canDismiss(data?: any, role?: string) {
    console.log('canDismiss called with data:', data, 'and role:', role);
    return role !== 'gesture';
  }

  async show() {
    const modal = await this.modal.create({
      component: Camera
    });
    await modal.present();
  }
  close() {
    this.modal.dismiss();
  }

  async openExerciseModal(exercise: any) {
    const modal = await this.modal.create({
      component: Camera, 
      componentProps: {
        exercise: exercise
      }
    });
    await modal.present();
  }


  ngOnInit() {
    const id = window.location.pathname.split('/').pop();

    if (id) {
      this.programDetailsService.getProgramDetails(Number.parseInt(id), false).then((programDetails: any) => {
        this.program = programDetails.data;
        console.log('Fetched program details:', this.program);
      }).catch(error => {
        console.error('Error fetching program details:', error);
      });
    }
  }
}
