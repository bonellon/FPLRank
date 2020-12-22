import { Component, OnInit } from '@angular/core';
import { FplApiService } from '../services/FplApiService';
import { multi } from '../data';
import { FplPlayer, GameweekScore, Node, Series } from '../models/PlayerRank';
import { first } from 'rxjs/operators';

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
        promiseArray.push(this.getPlayerDetails(playerId));
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

  async getPlayerDetails(playerId: number): Promise<FplPlayer> {
    const data = await this.api
      .GetPlayerDetails(playerId)
      .pipe(first())
      .toPromise();
    var gameweeks = await this.addPlayer(playerId);
    return new FplPlayer(
      data['id'],
      data['id'] +
        ' - ' +
        data['player_first_name'] +
        ' ' +
        data['player_last_name'],
      gameweeks
    );
  }

  async addPlayer(playerId: number): Promise<GameweekScore[]> {
    const data = await this.api
      .GetPlayerGameweekScores(playerId)
      .pipe(first())
      .toPromise();
    var gameweeks = data['current'].map(
      (gameweek) => gameweek as GameweekScore
    );
    return gameweeks;
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
