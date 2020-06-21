import { Component, Input, SimpleChanges } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-preduzece-dashboard-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent {
  @Input() narudzbine = [];

  public pastThirtyDays = [];
  public lineChartData: ChartDataSets[] = [];

  public lineChartLabels: Label[] = [];
  public lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    {
      borderColor: '#2a4365',
      backgroundColor: 'rgba(66, 153, 225,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  constructor() {
    this.pastThirtyDays = this.getPastThirtyDays();
    this.lineChartLabels = this.getCurrentMonthDates();
    this.lineChartData = this.getCurrentMonthValues();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.lineChartData = this.getCurrentMonthValues();
  }

  getPastThirtyDays() {
    const result = [];

    for (let i = 0; i < 30; i++) {
      result.push(new Date(new Date().setDate(new Date().getDate() - i)));
    }

    return result.reverse();
  }

  getCurrentMonthValues() {
    const mappedNarudzbine = this.narudzbine.map((narudzbina) => {
      return new Date(narudzbina.createdAt).toLocaleDateString('sr-Latn-RS');
    });

    const narudzbine = this.pastThirtyDays.map((date: Date) => {
      const formattedDate = date.toLocaleDateString('sr-Latn-RS');
      const total = mappedNarudzbine.filter(
        (vremeNarudzbine) => vremeNarudzbine === formattedDate
      );
      return total.length;
    });

    return [
      {
        data: narudzbine,
        label: 'Број наруђбина',
      },
    ];
  }

  getCurrentMonthDates() {
    return this.pastThirtyDays.map((date: Date) => {
      return date.toLocaleDateString('sr-Latn-RS');
    });
  }
}
