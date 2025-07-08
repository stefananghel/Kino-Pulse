import { Component, OnInit } from '@angular/core';
import { ProgramsService } from '../../../services/programs.service';
import { ModalController } from '@ionic/angular';
import { NewsService } from '../../../services/news.service';
import { marked } from 'marked';

@Component({
  selector: 'app-training',
  templateUrl: './training.page.html',
  styleUrls: ['./training.page.scss'],
})
export class TrainingPage implements OnInit {
  public buffer = 0.06;
  public progress = 0;

  programs: any[] = [];
  news: any = {};
  aboutAssessmentArticle: any = {};

  async canDismiss(data?: any, role?: string) {
    console.log('canDismiss called with data:', data, 'and role:', role);
    return role !== 'gesture';
  }

  constructor(private modal: ModalController, public programsService: ProgramsService,
              public newsService: NewsService) { }

  close() {
    this.modal.dismiss();
  }

  ngOnInit() {
    this.programsService.getPrograms(false).then((programs: any[]) => {
      console.log(programs);
      this.programs = programs;
    });

    this.newsService.getNews().then((news: any[]) => {
      this.news = news || [];
      this.aboutAssessmentArticle = this.news.news.find((item: any) => item.title === 'How assessment works');
      // console.log(this.aboutAssessmentArticle.description);
    });
  }

  markdowntoHTML(description: string ) {
    return marked(description);
  }
}
