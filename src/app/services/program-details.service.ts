import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProgramDetailsService {
    private apiUrl = (programId: number) => `https://test.kino.care/api/fitness/patients/${JSON.parse(localStorage.getItem('user') || '{}').id}/programs/${programId}`;

  private authHeader = "Basic " + btoa(localStorage.getItem('auth') + ":" + "test");
  private cachedProgramDetails: { [key: number]: any } = {};

  getProgramDetails(programId: number, refresh: boolean = false): Promise<any> {
    console.log(localStorage.getItem('auth'));

    // If program details are already fetched and not refreshing, return the cached details
    if (this.cachedProgramDetails[programId] && !refresh) {
      console.log('program details from cache', this.cachedProgramDetails[programId]);
      return Promise.resolve(this.cachedProgramDetails[programId]);
    }

    return fetch(this.apiUrl(programId), {
      method: 'GET',
      headers: {
        Authorization: this.authHeader || '',
      },
    })
      .then(response => response.json())
      .then(data => {
        this.cachedProgramDetails[programId] = data;
        return data;
      })
      .catch(error => {
        console.error('Error fetching program details:', error);
        throw error;
      });
  }

  constructor() {}
}
