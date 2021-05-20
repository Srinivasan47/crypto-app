import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private historicalDataUrl = 'https://api.coindesk.com/v1/bpi/historical/close.json';
  private liveCryptoPriceUrl = 'https://api.coindesk.com/v1/bpi/currentprice.json';
  
  constructor(private http: HttpClient) { }

   getHistoricalData(): Observable<any> {
      return this.http.get(this.historicalDataUrl)
         .pipe(map(result => {
           return this.transformData(result);
         }));
   }
  
   getLiveCryptoPriceData(): Observable<any> {
      return this.http.get(this.liveCryptoPriceUrl)
         .pipe(map(result => {
           return result;
         }));
   }
  
  private transformData(data) {
    const historyData = [];
    const indexes = data['bpi'];
    let price = 0,priceChange;
    for (const key in indexes) {
      if (price > 0) {
         priceChange = ((indexes[key]-price)/price * 100).toFixed(2);
      }
      else {
         priceChange = 0;
      }
      
      historyData.push({ date: new Date(key), value: indexes[key], priceChange:priceChange });
      price = indexes[key];
    }
    console.log(JSON.stringify(historyData));
    return historyData;
  }
}
