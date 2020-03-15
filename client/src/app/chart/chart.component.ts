import { Component, OnInit, ViewEncapsulation } from '@angular/core'
import * as d3 from 'd3'
import * as fc from 'd3fc'
import { dummyData } from '../dummyData'

interface RawData {
  time: number
  val: number
}

interface ParsedData extends RawData {
  date: Date
}

const margin = { top: 20, right: 20, bottom: 30, left: 32 }
const width = 575 - margin.left - margin.right
const height = 250 - margin.top - margin.bottom
const bisectDate = d3.bisector((d: ParsedData) => d.date).left

const x = d3.scaleTime()
  .range([0, width])

const y = d3.scaleLinear()
  .range([height, 0])

const area = d3.area()
  .x((d: ParsedData) => x(d.date))
  .y0(height)
  .y1((d: ParsedData) => y(d.val));

const line = d3.line()
  .x((d: ParsedData) => x(d.date))
  .y((d: ParsedData) => y(d.val))

const tickCount = 3

function getDomain(min: number, max: number): [number, number] {
  const diff = max - min
  return [0, 1]
} 

function drawChart(rawData: RawData[]) {
  const data: ParsedData[] = rawData.map(d => ({
    ...d,
    date: new Date(d.time * 1000)
  }));

  const svg = d3.select("#chart-element").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  const yExtent = d3.extent(data, (d: ParsedData) => d.val)
  const yRange = yExtent[1] - yExtent[0]
  const yPadding = yRange * 0.0

  x.domain([data[0].date, data[data.length - 1].date])

  //y.domain([yExtent[0] - yPadding, yExtent[1] + yPadding])
  y.domain([50, 70])

  // Y gridlines
  svg.append("g")
    .attr("class", "grid")
    .call(d3.axisLeft(y)
      .ticks(tickCount)
      .tickSize(-width)
      .tickFormat(""));

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).ticks(5));

  svg.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(y).ticks(tickCount))
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Spend $");

  svg.append("path")
    .datum(data)
    .attr("class", "area")
    .attr("d", area);

  svg.append("path")
    .datum(data)
    .attr("class", "line")
    .attr("d", line);
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
    drawChart(dummyData.data.kw);
  }
}
