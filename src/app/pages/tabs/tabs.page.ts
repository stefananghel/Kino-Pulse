import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  selectTab: any;
  @ViewChild('tabs',{static:false})
  tabs!: IonTabs;

  setCurrentTab() {
    this.selectTab = this.tabs.getSelected();
  }

}
