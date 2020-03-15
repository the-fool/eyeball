import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import * as d3 from 'd3';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { ChartComponent } from './chart/chart.component';
import { SummaryCardComponent } from './summary-card/summary-card.component';

console.log(d3)
@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    SummaryCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
