import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { FplPlayerRank } from '../models/PlayerRank';

@Injectable()
export class FplApiService{
    
    proxyurl = "https://cors-anywhere.herokuapp.com/";
    baseUrl = "https://fantasy.premierleague.com/api/"

    constructor(private http: HttpClient) { }


    GetPlayerGameweekScores(playerId: number ) : Observable<FplPlayerRank>{

        return this.http.get<FplPlayerRank>(this.proxyurl+this.baseUrl+"entry/"+playerId+"/history/")
    }


}