import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class ProgramsService {
  public buffer = 0.06;
  public progress = 0;
  public programs: any[] = [];

  private apiUrl = 'https://test.kino.care/api/programs';
  private authHeader = "Basic " + btoa(localStorage.getItem('auth') + ":" + "test");

  getPrograms(refresh: boolean = false): any {
    // If programs are already fetched and not refreshing, return the cached programs
    if (this.programs.length > 0 && !refresh) {
      console.log('programs from cache', this.programs);
      return Promise.resolve(this.programs);
    }

    return fetch(this.apiUrl, {
      method: 'GET',
      headers: {
        Authorization: this.authHeader || '',
      },
    })
      .then(response => response.json())
      .then(data => {
        this.programs = data;
        console.log('programs from fetch', this.programs);
        return this.programs;
      })
      .catch(error => {
        console.error('Error fetching programs:', error);
        throw error;
      });

  }

  constructor() {}
}
