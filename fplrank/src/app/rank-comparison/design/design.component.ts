import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import 'chartjs-plugin-zoom';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss'],
})
export class DesignComponent implements OnInit {
  ngOnInit() {}

  constructor() {}

  lineChartData: ChartDataSets[] = [];

  lineChartLabels: Label[] = [];

  lineChartOptions = {
    responsive: true,
    title: {
      display: true,
      text: 'Fantasy Premier League 2020/21 Team Points',
    },
    legend: {
      position: 'left',
    },
    scales: {
      xAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Gameweek',
          },
        },
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'Total Points',
          },
          position: 'left',
          ticks: {
            min: 0, //minimum tick
            max: 1000, //maximum tick
          },
        },
      ],
    },
    zoom: {
      enabled: true,         
      mode: 'x',     
    },
    pan : {
      enabled : true,         
      mode: 'xy',
      rangeMin: {
				x: 0,
				y: 0
			},
			rangeMax: {
				x: 15,
				y: 2000
			},
      
    }
  };

  lineChartLegend = true;
  lineChartType = 'line';

  updateDataset($event) {
    if (this.lineChartOptions.legend.position == 'right')
      this.lineChartOptions.legend.position = 'left';
    else this.lineChartOptions.legend.position = 'right';

    this.lineChartData = $event;
    this.updateMaxDataScales();
  }

  updateMaxDataScales() {
    var maxHeight = 0;
    var gameweeks = this.lineChartData[0].data.length;

    this.lineChartData.forEach((d) => {
      d.data.forEach((point) => {
        if (point > maxHeight) maxHeight = point;
      });
    });

    this.lineChartOptions.scales.yAxes.forEach((x) => {
      x.ticks.max = maxHeight;
    });
    this.lineChartOptions.pan.rangeMax.x = gameweeks;

    for (var i = 1; i < gameweeks; i++) {
      if (!(i.toString() in this.lineChartLabels))
        this.lineChartLabels.push(i.toString());
    }
  }
}
