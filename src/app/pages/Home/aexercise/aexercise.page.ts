import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aexercise',
  templateUrl: './aexercise.page.html',
  styleUrls: ['./aexercise.page.scss'],
})
export class AexercisePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  items = [
    { label: 'Allexercises', focused: true },
    { label: 'Arms', focused: false },
    { label: 'Chest', focused: false },
    { label: 'Leg', focused: false },
  ];

  onFocus(index: number) {
    this.items.forEach((item, i) => {
      item.focused = i === index;
    });
  }

}
