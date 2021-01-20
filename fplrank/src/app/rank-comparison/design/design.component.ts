import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { multi } from 'src/app/data';
import { FplPlayer } from 'src/app/models/PlayerRank';
import { Series } from "src/app/models/Series";
import { FplApiService } from 'src/app/services/FplApiService';

import {Node} from 'src/app/models/Node';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss'],
})
export class DesignComponent implements OnInit {
  ngOnInit() {}

  constructor(){}

  playerIds: number[] = [];
  players: Node[] = [];
  multi: any[];
  playerId: number = 1;

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

  async getLeague() {
    this.playerIds = await this.api.GetLeaguePlayerDetails(163980);

    console.log(this.playerIds);
  }

  

  addPlayerId() {
    if (!this.playerIds.includes(this.playerId)) {
      console.log('Adding player to playerIds:' + this.playerId);
      this.playerIds.push(this.playerId);
    }

    //Reset input
    this.playerId = 1;
  }

  async plotGraph() {
    var promiseArray = [];
    for await (var playerId of this.playerIds) {
      console.log('Will plot: ' + playerId);

      if (
        this.players.find((p) => p.name == playerId.toString()) === undefined
      ) {
        console.log('Getting player from FPL : ' + playerId);
        promiseArray.push(this.api.GetPlayerDetails(playerId));
      } else {
        console.log('Skipping player:' + playerId);
      }
    }

    var fplPlayers = await Promise.all(promiseArray);
    console.log(fplPlayers);
    fplPlayers.forEach((player) => {
      if (this.players.find((p) => p.name == player.name) == undefined)
        this.addNewPlayer(player);
    });

    console.log(this.players);
    this.multi = JSON.parse(JSON.stringify(this.players));
    console.log(this.multi);
  }

  addNewPlayer(player: FplPlayer) {
    this.players.push(
      new Node(
        player.name,
        player.scores.map((f) => new Series(f.total_points, f.event.toString()))
      )
    );

    var x = this.lineChartData.find((p) => p.label == player.id.toString());
    console.log(x);
    if (x == undefined) {
      var xx: ChartDataSets = {
        label: player.id.toString(),
        data: player.scores.map((s) => s.total_points),
        pointHoverRadius: 3,
        fill: false,
        backgroundColor: "red",
        pointHoverBackgroundColor : "green",
        
      };

      this.lineChartData.push(xx);
    } else {
      player.scores.forEach((score) => {
        this.lineChartData
          .find((p) => p.label == player.id.toString())
          .data.push(score.total_points);
      });
    }
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
