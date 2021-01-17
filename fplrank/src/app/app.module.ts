import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RankComparisonComponent } from './rank-comparison/rank-comparison.component';
import { HttpClientModule } from '@angular/common/http';
import { FplApiService } from './services/FplApiService';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FormsModule } from '@angular/forms';
import { DesignComponent } from './design/design.component';

@NgModule({
  declarations: [
    AppComponent,
    RankComparisonComponent,
    DesignComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ChartsModule,
    NgxChartsModule,
    MatFormFieldModule, MatSidenavModule,
    FormsModule
  ],
  providers: [FplApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
