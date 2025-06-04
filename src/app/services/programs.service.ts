import {Injectable} from '@angular/core';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root',
})

export class ProgramsService  {
  public buffer = 0.06;
  public progress = 0;
  public programs: any[] = [];

  private apiUrl = 'http://192.168.2.242:8101/api/programs';
  private authHeader = "Basic " + btoa(localStorage.getItem('auth') + ":" + "test");

  async fetchPrograms() {
    try {
      const response = await fetch(this.apiUrl, {
        headers: {
          'Authorization': this.authHeader
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      this.programs = data;
      return data;
    } catch (error) {
      console.error('Error fetching programs:', error);
    }
  }

  constructor() {

  }



}
