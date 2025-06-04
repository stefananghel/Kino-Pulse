import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-sworkout',
  templateUrl: './sworkout.page.html',
  styleUrls: ['./sworkout.page.scss'],
})
export class SworkoutPage implements OnInit {

  constructor(private modal:ModalController) { }

  close(){
    this.modal.dismiss();
  }

  ngOnInit() {
  }

}
