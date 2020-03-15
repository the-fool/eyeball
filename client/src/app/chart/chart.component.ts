import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import * as fc from 'd3fc';
import { data } from '../data';

interface RawData {
  Timestamp: number;
  high: number;
  low: number;
}

function initChart(rawData: RawData[]) {
  const parsedData = rawData.map(d => ({
    ...d,
    date: new Date(d.Timestamp * 1000)
  }))
  const xExtent = fc.extentDate()
    .accessors([d => d.date]);
  const yExtent = fc.extentLinear()
    .pad([0.1, 0.1])
    .accessors([d => d.high, d => d.low]);

  const lineSeries = fc
    .seriesSvgLine()
    .mainValue(d => d.high)
    .crossValue(d => d.date);
  const areaSeries = fc
    .seriesSvgArea()
    .baseValue(d => yExtent(data)[0])
    .mainValue(d => d.high)
    .crossValue(d => d.date);
  const gridlines = fc
    .annotationSvgGridline()
    .yTicks(5)
    .xTicks(0);
  const multi = fc.seriesSvgMulti()
    .series([gridlines, areaSeries, lineSeries]);
  
  const chart = fc
    .chartCartesian(d3.scaleTime(), d3.scaleLinear())
    .yOrient("right")
    .yDomain(yExtent(parsedData))
    .xDomain(xExtent(parsedData))
    .svgPlotArea(multi);

  d3.select("#chart-element")
    .datum(parsedData)
    .call(chart)
    .on('mouseover', function() {console.log('over')});
}

@Component({
  selector: 'eb-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.styl'],
  encapsulation: ViewEncapsulation.None
})
export class ChartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    initChart(data);
  }
}
