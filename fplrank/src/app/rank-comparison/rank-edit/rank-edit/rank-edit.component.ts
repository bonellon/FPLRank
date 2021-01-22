import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FplPlayer } from 'src/app/models/PlayerRank';
import { Node } from 'src/app/models/Node';
import { FplApiService } from 'src/app/services/FplApiService';
import { ChartDataSets } from 'chart.js';
import { Series } from 'src/app/models/Series';
import { ColorHelper } from '@swimlane/ngx-charts';


@Component({
  selector: 'rank-edit',
  templateUrl: './rank-edit.component.html',
  styleUrls: ['./rank-edit.component.scss']
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
    '#d92020'
  ]


  @Output() dataEvent = new EventEmitter<ChartDataSets[]>();
  
  constructor(private api: FplApiService) {
  }

  ngOnInit(): void {
  }

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

  }

  addNewPlayer(player: FplPlayer) {
    this.players.push(
      new Node(
        player.name,
        player.scores.map((f) => new Series(f.total_points, f.event.toString()))
      )
    );

    var x = this.lineChartData.find(p => p.label == player.id.toString());
    var position = this.lineChartData.findIndex(p => p.label == player.id.toString());

    console.log(position)
    console.log(x);
    console.log(this.lineChartData)

    if (x == undefined) {
      var xx: ChartDataSets = {
        label: player.id.toString(),
        data: player.scores.map((s) => s.total_points),
        borderColor : this.lineChartColors[this.lineChartData.length],
        pointBackgroundColor : this.lineChartColors[this.lineChartData.length],
        fill : false
      };

      this.lineChartData.push(xx);
    } else {
      player.scores.forEach((score) => {
        this.lineChartData
          .find((p) => p.label == player.id.toString())
          .data.push(score.total_points);
      });
    }

    this.dataEvent.emit(this.lineChartData);
  }

}
