import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Subject } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-price-table',
  templateUrl: './price-table.component.html',
  styleUrls: ['./price-table.component.css']
})
export class PriceTableComponent implements OnInit {
dtOptions: {};
  dtTrigger: Subject<any> = new Subject();
  histroyData: [];
  constructor(private DataService: DataService) {
      this.loadHistoricalData();
      
    }
 loadHistoricalData() {
    this.DataService.getHistoricalData()
      .subscribe(
        (data) => {
          this.histroyData = data;
          this.dtTrigger.next();
        }
      );
  }

  ngOnInit() {
     this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
  }

}
