import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.page.html',
  styleUrls: ['./activity.page.scss'],
})
export class ActivityPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  items = [
    { label: '12', focused: true },
    { label: '13', focused: false },
    { label: '14', focused: false },
    { label: '15', focused: false },
    { label: '16', focused: false },
  ];

  onFocus(index: number) {
    this.items.forEach((item, i) => {
      item.focused = i === index;
    });
  }

}
