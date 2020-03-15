import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'eb-summary-card',
  templateUrl: './summary-card.component.html',
  styleUrls: ['./summary-card.component.styl']
})
export class SummaryCardComponent implements OnInit {
  name = "Tyson Foods, INC"
  stockTicker = "TSN"
  spend = 12458
  constructor() { }

  ngOnInit(): void {
  }

}
