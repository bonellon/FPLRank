import { Component, OnInit } from '@angular/core';
import { FplApiService } from '../services/FplApiService';
import { multi } from '../data';
import { Node, Series } from '../models/PlayerRank';

@Component({
  selector: 'rank-comparison',
  templateUrl: './rank-comparison.component.html',
  styleUrls: ['./rank-comparison.component.scss'],
})
export class RankComparisonComponent implements OnInit {
  players: Node[] = [];

  multi: any[];
  view: any[] = [700, 300];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Gameweek';
  yAxisLabel: string = 'Points';
  timeline: boolean = false;

  playerId: number = 1;
  playerIds: number[] = [];

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };

  constructor(private api: FplApiService) {
    Object.assign(this, { multi });
  }

  ngOnInit(): void {}

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
        this.players.push(
          new Node(
            player.name,
            player.scores.map(
              (f) => new Series(f.total_points, f.event.toString())
            )
          )
        );
    });

    console.log(this.players);
    this.multi = JSON.parse(JSON.stringify(this.players));
    console.log(this.multi);
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
