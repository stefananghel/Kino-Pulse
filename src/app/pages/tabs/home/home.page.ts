import {Component, OnInit, ViewChild} from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})


export class HomePage implements OnInit {
  @ViewChild("chart") chart: ChartComponent | undefined;
  public chartOptions;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "My-series",
          data: [0, 0, 0, 0, 0]
        }
      ],
      chart: {
        height: '500px',
        width: '100%',
        type: "radar" as const,
        toolbar: {
          show: false
        }
      },
      title: {
        text: undefined,
      },

      colors: ['#fff'],

      xaxis: {
        categories: ["Mobility", "Power", "Endurance", "Strength", "Balance"],
        labels: {
          show: true,
          textAnchor: 'start',
          distributed: true,
          style: {
            colors: ['#fff', '#fff', '#fff', '#fff', '#fff'],
            fontSize: '14px',
            fontWeight: 600
          },
          offsetY: 5,
          offsetX: 0,
          background:{
            enabled: true,
            foreColor: '#fff',
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#fff',
          }
        }
      },
    };
  }


  ngOnInit() {
  }

  protected readonly localStorage = localStorage;
  protected readonly JSON = JSON;
}
