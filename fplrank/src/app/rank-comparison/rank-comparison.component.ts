import { Component, OnInit, ɵCompiler_compileModuleSync__POST_R3__ } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FplApiService } from '../services/FplApiService';
import { multi } from '../data';
import { FplPlayerRank, Node, Series } from '../models/PlayerRank';
@Component({
  selector: 'rank-comparison',
  templateUrl: './rank-comparison.component.html',
  styleUrls: ['./rank-comparison.component.scss']
})
export class RankComparisonComponent implements OnInit {

  players : Node[] = [];


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

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };


  constructor(private api : FplApiService) { 
    
    Object.assign(this, {  multi });
  }

  ngOnInit(): void {

    console.log("init")
    this.api.GetPlayerGameweekScores(3519).subscribe(
      (data) => this.addPlayer(3519, data)
    );

    this.api.GetPlayerGameweekScores(4027949).subscribe(
      (data) => this.addPlayer(4027949, data)
    );

  }

  addPlayer(playerId : number, fplPlayer : FplPlayerRank){
    console.log(fplPlayer)
    this.players.push(new Node(playerId.toString(), fplPlayer.current.map(f => new Series(f.total_points, f.event.toString()))));
    console.log(JSON.stringify(this.players))
    
    var players = this.players
    console.log(players)
    
    this.multi = players

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
