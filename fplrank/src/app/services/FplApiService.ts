import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FplPlayer } from '../models/PlayerRank';
import { GameweekScore } from "../models/GameweekScore";
import { first } from 'rxjs/operators';

@Injectable()
export class FplApiService {
  proxyurl = '';//'https://cors-anywhere.herokuapp.com/';
  baseUrl = this.proxyurl + 'https://fantasy.premierleague.com/api/';

  constructor(private http: HttpClient) {}

  async GetPlayerDetails(playerId: number): Promise<FplPlayer> {
    var response = this.http.get(this.baseUrl + 'entry/' + playerId + '/');

    var data = await response.pipe(first()).toPromise();
    var gameweeks = await this.GetPlayerGameweekScores(playerId);

    return new FplPlayer(data['id'], 
        data['player_first_name'] + ' ' + data['player_last_name'],
        gameweeks,
        data['summary_overall_points']
    );
  }

  async GetPlayerGameweekScores(playerId: number): Promise<GameweekScore[]> {
    var response = this.http.get(
      this.baseUrl + 'entry/' + playerId + '/history/'
    );

    var data = await response.pipe(first()).toPromise();

    var gameweeks = data['current'].map(
      (gameweek) => gameweek as GameweekScore
    );
    return gameweeks;
  }

  async GetLeaguePlayerDetails(leagueId: number): Promise<number[]> {
    var response = this.http.get(
        this.baseUrl + 'leagues-classic/' + leagueId + '/standings/');
  
        var data = await response.pipe(first()).toPromise();
        
        var playerIds = [];
        var players = data['standings']['results'];
        console.log(players)
        players.forEach(player => {
            playerIds.push(player['entry'])
        });

        console.log(playerIds)
        return playerIds;  
    }
}
