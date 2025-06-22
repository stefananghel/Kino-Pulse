import { Component, OnInit } from '@angular/core';
import { ProgramsService } from '../../../services/programs.service';
import { ModalController } from '@ionic/angular';
import { HomePage } from '../../tabs/home/home.page';
import { Camera } from '../../Profile/camera/camera.page';


@Component({
  selector: 'app-wdetail',
  templateUrl: './wdetail.page.html',
  styleUrls: ['./wdetail.page.scss'],
})
export class WdetailPage implements OnInit {
  program: any;

  constructor(private modal: ModalController, public programsService: ProgramsService) { }

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


  ngOnInit() {
this.show();

    const id = window.location.pathname.split('/').pop();


    if (id) {
      this.programsService.getPrograms(false).then((programs: any[]) => {

        this.program = programs.find((program) => program.id === Number.parseInt(id));
      })

    }
    
  }

}
