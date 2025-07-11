import { Component, OnInit } from '@angular/core';
import { ProgramsService } from '../../../services/programs.service';
import { ModalController } from '@ionic/angular';
import { ProgramDetailsService } from '../../../services/program-details.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-wdetail',
  templateUrl: './wdetail.page.html',
  styleUrls: ['./wdetail.page.scss'],
})
export class WdetailPage implements OnInit {
  program: any;

  constructor(public programsService: ProgramsService, private programDetailsService: ProgramDetailsService, private router: Router) { }

  async navigateToCamera(exercise: any) {
    this.router.navigate(['/program', this.program.id, 'exercise', exercise.id, 'camera']);
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
