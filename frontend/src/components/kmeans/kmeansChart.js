import React, {Component} from 'react';
import * as d3 from 'd3';


function properMinScaling(n) {
    if (n >= 0)
        return n * 0.9;
    else
        return n * 1.1;
}

function properMaxScaling(n) {
    if (n >= 0)
        return n * 1.1;
    else
        return n * 0.9;
}

export class KMeansChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 800,
            height: 400,
            radius: 5,
            margin: {
                left: 50,
                right: 10,
                top: 20,
                bottom: 50
            }
        };

        this.drawWidth = this.state.width - this.state.margin.left - this.state.margin.right;
        this.drawHeight = this.state.height - this.state.margin.top - this.state.margin.bottom;
    };

    componentDidMount() {
        this.update();
    }

    componentDidUpdate() {
        this.update();
    };

    updateScales() {
        const allPoints = this.props.points
            .concat(this.props.centroids);
        
        let xMin = d3.min(allPoints, (d) => properMinScaling(+d.x));
        let xMax = d3.max(allPoints, (d) => properMaxScaling(+d.x));
        let yMin = d3.min(allPoints, (d) => properMinScaling(+d.y));
        let yMax = d3.max(allPoints, (d) => properMaxScaling(+d.y));

        this.xScale = d3.scaleLinear().domain([xMin, xMax]).range([0, this.drawWidth])
        this.yScale = d3.scaleLinear().domain([yMax, yMin]).range([0, this.drawHeight])
    }
    
    updatePoints() {
        let centroids = d3.select(this.chartArea).selectAll('rect').data(this.props.centroids);
        let r = this.state.radius;
        let colors = this.props.colors;

        centroids.enter().append('rect')
            .merge(centroids)
            .attr('width', r * 4)
            .attr('height', r * 4)
            .attr('fill-opacity', 0.6)
            .attr('fill', (d) => colors[d.label])
            .attr('label', (d) => d.label)
            .transition().duration(500)
            .attr('x', (d) => this.xScale(d.x) - 2*r)
            .attr('y', (d) => this.yScale(d.y) - 2*r)

        centroids.exit().remove();

        let circles = d3.select(this.chartArea).selectAll('circle').data(this.props.points);

        circles.enter().append('circle')
            .merge(circles)
            .attr('r', (d) => r)
            .attr('fill', (d) => colors[d.label])
            .attr('label', (d) => d.label)
            .transition().duration(500)
            .attr('cx', (d) => this.xScale(d.x))
            .attr('cy', (d) => this.yScale(d.y))

        circles.exit().remove();
    }
    
    updateAxes() {
        let xAxisFunction = d3.axisBottom()
            .scale(this.xScale)
            .ticks(5, 's');

        let yAxisFunction = d3.axisLeft()
            .scale(this.yScale)
            .ticks(5, 's');

        d3.select(this.xAxis)
            .call(xAxisFunction);

        d3.select(this.yAxis)
            .call(yAxisFunction);
    }
    
    update() {
        this.updateScales();
        this.updateAxes();
        this.updatePoints();
    }

    render() {
        return (
            <div className="kmeans__chart">
                <svg className="chart" width={this.state.width} height={this.state.height}>
                    <g ref={(node) => { this.chartArea = node; }}
                        transform={`translate(${this.state.margin.left}, ${this.state.margin.top})`} />

                    {/* Axes */}
                    <g ref={(node) => { this.xAxis = node; }}
                        transform={`translate(${this.state.margin.left}, ${this.state.height - this.state.margin.bottom})`}></g>
                    <g ref={(node) => { this.yAxis = node; }}
                        transform={`translate(${this.state.margin.left}, ${this.state.margin.top})`}></g>
                </svg>
            </div>

        )
    }
};