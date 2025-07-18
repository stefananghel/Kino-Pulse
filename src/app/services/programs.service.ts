import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProgramsService {
  public buffer = 0.06;
  public progress = 0;
  public programs: any[] = [];


  private apiUrl = `${environment.apiUrl}/patients/${JSON.parse(localStorage.getItem('user') || '{}').id}/programs?status=open&offset=0&limit=10`;
  private authHeader = "Basic " + btoa(localStorage.getItem('auth') + ":" + "test");

  getPrograms(refresh: boolean = false): any {
    // If programs are already fetched and not refreshing, return the cached programs
    if (this.programs.length > 0 && !refresh) { 
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
        this.programs = (data.data && data.data.items) ? data.data.items : [];
        return this.programs;

      })
      .catch(error => {
        console.error('Error fetching programs:', error);
        throw error;
      });

  }

  constructor() { }
}
