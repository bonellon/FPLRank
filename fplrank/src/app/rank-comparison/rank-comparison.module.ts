import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignComponent } from './design/design.component';
import { ChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { RankEditComponent } from './rank-edit/rank-edit/rank-edit.component';



@NgModule({
  declarations: [
    DesignComponent,
    RankEditComponent
  ],
  imports: [
    CommonModule,
    ChartsModule,
    FormsModule,
    NgxChartsModule
  ],
  exports: [DesignComponent],
})
export class RankComparisonModule { }
