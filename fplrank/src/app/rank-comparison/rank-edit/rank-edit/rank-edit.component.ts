import { Component, OnInit } from '@angular/core';
import { FplPlayer } from 'src/app/models/PlayerRank';
import { Node } from 'src/app/models/Node';
import { FplApiService } from 'src/app/services/FplApiService';


@Component({
  selector: 'app-rank-edit',
  templateUrl: './rank-edit.component.html',
  styleUrls: ['./rank-edit.component.scss']
})
export class RankEditComponent implements OnInit {
  

  playerIds: number[] = [];
  players: Node[] = [];
  playerId: number = 1;

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

}
