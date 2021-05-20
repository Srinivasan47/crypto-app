import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ServicesModule } from './services/services.module';
import { AppComponent } from './app.component';
import { HistoricalChartComponent } from './component/historical-chart/historical-chart.component';
import { PriceTableComponent } from './component/price-table/price-table.component';
import { PriceCardComponent } from './component/price-card/price-card.component';
import { AppRoutingModule } from './app-routing.module';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [
    AppComponent,
    HistoricalChartComponent,
    PriceTableComponent,
    PriceCardComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ServicesModule,
    DataTablesModule
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
