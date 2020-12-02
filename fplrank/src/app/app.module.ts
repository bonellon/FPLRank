import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RankComparisonComponent } from './rank-comparison/rank-comparison.component';
import { HttpClientModule } from '@angular/common/http';
import { FplApiService } from './services/FplApiService';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    RankComparisonComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxChartsModule,
    FormsModule
  ],
  providers: [FplApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
