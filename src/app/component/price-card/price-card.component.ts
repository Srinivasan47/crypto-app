import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from './../../services/data.service';
@Component({
  selector: 'app-price-card',
  templateUrl: './price-card.component.html',
  styleUrls: ['./price-card.component.css']
})
export class PriceCardComponent implements OnInit, OnDestroy {
  title = 'Live BTC Price Change on every one minute';
  cryptocurrencies: {};
  histroyData: [];
  interval: any;
  constructor(private DataService: DataService) {
    this.loadCurrencies();
    this.loadHistoricalData()
   }

  livePriceChange(data) {
    const cryptoPrice = data['bpi']['USD'];
    let priceChange = 0;
    if (cryptoPrice.rate_float > 0) {
      priceChange = ((cryptoPrice.rate_float - this.histroyData[this.histroyData.length - 1].value) / cryptoPrice.rate_float) * 100;
    }
    cryptoPrice.priceChange = priceChange.toFixed(2);
    return cryptoPrice;
  }
  
  loadCurrencies() {
    this.DataService.getLiveCryptoPriceData()
      .subscribe(
        (data) => {

          this.cryptocurrencies = this.livePriceChange(data);
        }
      );
   }
  
loadHistoricalData() {
    this.DataService.getHistoricalData()
      .subscribe(
        (data) => {
          this.histroyData = data;
        }
      );
}
  
  ngOnInit() {
     this.interval = setInterval(() => {
      this.loadCurrencies();
    }, 60000);
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

}
