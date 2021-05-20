import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HistoricalChartComponent } from './component/historical-chart/historical-chart.component';
import { PriceCardComponent } from "./component/price-card/price-card.component";
import { PriceTableComponent } from "./component/price-table/price-table.component";

export const routes: Routes = [
   { path: '', redirectTo: '/chart', pathMatch: 'full' },
   { path: 'chart', component: HistoricalChartComponent },
   { path: 'datatable', component: PriceTableComponent },
   { path: 'price-card', component: PriceCardComponent }
];

@NgModule({
   imports: [RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' })],
   exports: [RouterModule]
})
export class AppRoutingModule {
}