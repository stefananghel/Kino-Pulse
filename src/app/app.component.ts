import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public user: any | null;
  constructor() {
    this.user = localStorage.getItem('user');

//if page not login or signup and not logged in, redirect to login page
    if (!this.user && !window.location.pathname.includes('/login') && !window.location.pathname.includes('/signup')) {
      window.location.href = '/login';
    }

  }
}
