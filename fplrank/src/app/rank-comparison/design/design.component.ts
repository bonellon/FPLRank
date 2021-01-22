import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';


@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss'],
})
export class DesignComponent implements OnInit {
  ngOnInit() {}

  constructor(){}


  lineChartData: ChartDataSets[] = [
    {
      data: [85, 72, 78, 75, 77, 75],
      label: 'Crude oil prices',
      pointHoverRadius: 30,
      fill: false,
    },
    {
      data: [85, 78, 5, 35, 6, 125],
      label: 'Crude oil prices',
      pointHoverRadius: 3,
      fill: false,
    },
    {
      data: [1, 2, 3, 134, 55, 166, 157],
      label: 'Crude oil prices',
      pointHoverRadius: 3,
      fill: false,
    },
  ];

  lineChartLabels: Label[] = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
  ];

  lineChartOptions = {
    responsive: true,
    title: {
      display: true,
      text: 'Chart.js Line Chart - Different point sizes',
    },
    legend: {
      position: 'left',
    },
  };

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  updateDataset($event){
    console.log($event);
    this.lineChartData = $event;
  }
}
