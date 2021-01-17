import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss'],
})
export class DesignComponent implements OnInit {
  ngOnInit() {}

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
      pointHoverRadius: 30,
      fill: false,
    },
    {
      data: [1, 2, 3, 134, 55, 166, 157],
      label: 'Crude oil prices',
      pointHoverRadius: 30,
      fill: false,
    },
  ];

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLabels: Label[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
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
}
