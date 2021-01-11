import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class FplApiService{
    
    proxyurl = "";//"https://cors-anywhere.herokuapp.com/";
    baseUrl = "https://fantasy.premierleague.com/api/";

    constructor(private http: HttpClient) { }


    GetPlayerDetails(playerId: number) : Observable<Object>{
        return this.http.get(this.proxyurl+this.baseUrl+"entry/"+playerId+"/")
    }

    GetPlayerGameweekScores(playerId: number) : Observable<Object>{
        return this.http.get(this.proxyurl+this.baseUrl+"entry/"+playerId+"/history/", )
    }

    GetLeagueDetails(leagueId: number) : Observable<Object> {
        return this.http.get(this.proxyurl+this.baseUrl+"leagues-classic/"+leagueId+"/standings/");
    }

}