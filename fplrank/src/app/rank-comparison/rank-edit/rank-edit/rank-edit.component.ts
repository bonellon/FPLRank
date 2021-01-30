import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FplPlayer } from 'src/app/models/PlayerRank';
import { Node } from 'src/app/models/Node';
import { FplApiService } from 'src/app/services/FplApiService';
import { ChartDataSets } from 'chart.js';
import { Series } from 'src/app/models/Series';
import { ColorHelper } from '@swimlane/ngx-charts';
import { MatTableDataSource } from '@angular/material/table';

export interface Player {
  id: number;
  name: string;
  points: number;
}

@Component({
  selector: 'rank-edit',
  templateUrl: './rank-edit.component.html',
  styleUrls: ['./rank-edit.component.scss'],
})
export class RankEditComponent implements OnInit {
  playerIds: number[] = [];
  players: Node[] = [];
  playerId: number = 1;
  lineChartData: ChartDataSets[] = [];
  lineChartColors = [
    '#791c81',
    '#43328d',
    '#416fb8',
    '#519db8',
    '#70b484',
    '#99bd5c',
    '#c3bb45',
    '#e0a339',
    '#e66b2d',
    '#d92020',
  ];

  displayedColumns: string[] = ['id', 'name', 'points', 'test'];

  tableData: Node[] = [];
  dataSource = new MatTableDataSource<Node>(this.tableData);

  @Output() dataEvent = new EventEmitter<ChartDataSets[]>();

  constructor(private api: FplApiService) {}

  ngOnInit(): void {}

  async getLeague() {
    this.playerIds = await this.api.GetLeaguePlayerDetails(163980);
  }

  async addPlayerId() {
    if (!this.playerIds.includes(this.playerId)) {
      this.playerIds.push(this.playerId);
    }

    var promiseArray = [];
    for await (var playerId of this.playerIds) {
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
    fplPlayers.forEach((player) => {
      if (this.players.find((p) => p.name == player.name) == undefined)
        this.addNewPlayer(player);
    });

    //Reset input
    this.playerId = 1;
  }

  addNewPlayer(player : FplPlayer){
    
    var node = new Node(
      player.id,
      player.name,
      player.scores.map((f) => new Series(f.total_points, f.event.toString()))
    );

    this.players.push(node);
    this.tableData.push(node);
    console.log(this.tableData);
    this.dataSource = new MatTableDataSource<Node>(this.tableData);
    console.log(this.tableData);
  }

  async plotGraph() {
    this.players.forEach((player) => {
      var x = this.lineChartData.find((p) => p.label == player.id.toString());
      console.log(this.lineChartData)
      if (x == undefined) {
        console.log(player);

        var xx: ChartDataSets = {
          label: player.id.toString(),
          data: player.series.map((s) => s.value),
          borderColor: this.lineChartColors[this.lineChartData.length],
          pointBackgroundColor: this.lineChartColors[this.lineChartData.length],
          fill: false,
        };

        this.lineChartData.push(xx);
      } else {
        console.log("player already exists")
      }
      this.dataEvent.emit(this.lineChartData);
    });
  }
}
