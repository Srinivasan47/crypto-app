import { Component, OnInit } from '@angular/core';
import {DataService } from '../../services/data.service';
import * as d3 from 'd3';
import * as d3Scale from 'd3';
import * as d3Shape from 'd3';
import * as d3Array from 'd3';
import * as d3Axis from 'd3';

@Component({
  selector: 'app-historical-chart',
  templateUrl: './historical-chart.component.html',
  styleUrls: ['./historical-chart.component.css']
})
export class HistoricalChartComponent implements OnInit {

 title = 'Last 30 Days Price Chart';
histroyData: [];
    private margin = {top: 20, right: 20, bottom: 30, left: 50};
    private width: number;
    private height: number;
    private x: any;
    private y: any;
    private svg: any;
    private line: d3Shape.Line<[number, number]>;

  constructor(private DataService: DataService) {
      this.loadHistoricalData();
        this.width = 900 - this.margin.left - this.margin.right;
        this.height = 500 - this.margin.top - this.margin.bottom;
    }
 loadHistoricalData() {
    this.DataService.getHistoricalData()
      .subscribe(
        (data) => {
          this.histroyData = data;
               this.initSvg();
        this.initAxis();
        this.drawAxis();
        this.drawLine()
        }
      );
  }
    ngOnInit() {
   
    }

    private initSvg() {
        this.svg = d3.select('svg')
            .append('g')
            .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
    }

    private initAxis() {
        this.x = d3Scale.scaleTime().range([0, this.width]);
        this.y = d3Scale.scaleLinear().range([this.height, 0]);
        this.x.domain(d3Array.extent(this.histroyData, (d) => d.date ));
        this.y.domain(d3Array.extent(this.histroyData, (d) => d.value ));
    }

    private drawAxis() {

        this.svg.append('g')
            .attr('class', 'axis axis--x')
            .attr('transform', 'translate(0,' + this.height + ')')
            .call(d3Axis.axisBottom(this.x));

        this.svg.append('g')
            .attr('class', 'axis axis--y')
            .call(d3Axis.axisLeft(this.y))
            .append('text')
          .attr('class', 'axis-title')
          .attr("fill", "#000")
            .attr('transform', 'rotate(-90)')
            .attr('y', 6)
            .attr('dy', '.71em')
            .style('text-anchor', 'end')
            .text('Price ($)');
    }

    private drawLine() {
        this.line = d3Shape.line()
            .x( (d: any) => this.x(d.date) )
            .y( (d: any) => this.y(d.value) );

      this.svg.append('path')
        .datum(this.histroyData)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", this.line);
    }

}
