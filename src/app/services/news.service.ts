import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  public news: any[] = [];

  private apiUrl = 'https://api.kino.care/projects/fitness/news.json?project_id=fitness&limit=10';
  private authHeader = "Basic " + btoa(localStorage.getItem('auth') + ":" + "test");

  getNews(refresh: boolean = false): any {
    if (this.news.length > 0 && !refresh) { 
      return Promise.resolve(this.news);
    }

    return fetch(this.apiUrl, {
      method: 'GET',
      headers: {
        Authorization: this.authHeader || '',
      },
    })
      .then(response => response.json())
      .then(data => {
        this.news = data;   
        return this.news;
      })
      .catch(error => {
        console.error('Error fetching programs:', error);
        throw error;
      });

  }

  constructor() {}
}
