import {
  Component,
  OnInit,
  ɵCompiler_compileModuleSync__POST_R3__,
} from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FplApiService } from '../services/FplApiService';
import { multi } from '../data';
import { FplPlayerRank, Node, Series } from '../models/PlayerRank';
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

  playerId: number = 0;
  playerIds: number[] = [];

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };

  constructor(private api: FplApiService) {
    Object.assign(this, { multi });
  }

  ngOnInit(): void {}

  
  addPlayerId() {
    console.log(this.playerId);
    if (!this.playerIds.includes(this.playerId)) {
      this.playerIds.push(this.playerId);
    }

    //Reset input
    this.playerId = 0;
  }

  async addPlayer(playerId: number) {
    this.api.GetPlayerGameweekScores(playerId).subscribe((data) => {
            this.players.push(
        new Node(
          playerId.toString(),
          data.current.map(
            (f) => new Series(f.total_points, f.event.toString())
          )
        )
      );
      console.log(JSON.stringify(this.players));
    });

  }

  plotGraph() {
    this.playerIds.forEach(async playerId => {
      console.log("Adding player: "+playerId);
      await this.addPlayer(playerId);
    });

    this.multi = JSON.parse(JSON.stringify(this.players))
    console.log(this.multi)
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
