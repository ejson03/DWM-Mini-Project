import React, {Component} from 'react';
import * as d3 from 'd3';

const colors = [
    'red',
    'green',
    'blue',
    'orange',
    'green',
    'sienna',
    'peachpuff',
    'purple',
    'pink',
    'turquoise'
];

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

export class LDAChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 800,
            height: 400,
            radius: 3,
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
            .concat(this.props.line);
        
        let xMin = d3.min(allPoints, (d) => properMinScaling(+d.x));
        let xMax = d3.max(allPoints, (d) => properMaxScaling(+d.x));
        let yMin = d3.min(allPoints, (d) => properMinScaling(+d.y));
        let yMax = d3.max(allPoints, (d) => properMaxScaling(+d.y));

        this.xScale = d3.scaleLinear().domain([xMin, xMax]).range([0, this.drawWidth])
        this.yScale = d3.scaleLinear().domain([yMax, yMin]).range([0, this.drawHeight])
    }
    
    updatePoints() {
        let circles = d3.select(this.chartArea).selectAll('circle').data(this.props.points);

        circles.enter().append('circle')
            .merge(circles)
            .attr('r', (d) => this.state.radius)
            .attr('fill', (d) => {
                return colors[d.label % colors.length];
            })
            .attr('label', (d) => d.label)
            .transition().duration(500)
            .attr('cx', (d) => this.xScale(d.x))
            .attr('cy', (d) => this.yScale(d.y))

        circles.exit().remove();
    }

    updateLines() {
        const allPoints = [this.props.line];

        const line = d3.line()
            .x((d) => this.xScale(+d.x))
            .y((d) => this.yScale(+d.y))
            .curve(d3.curveMonotoneX);

        let ldaLine = d3.select(this.chartArea)
            .selectAll('path')
            .data(allPoints);
        
        ldaLine.enter().append('path')
            .merge(ldaLine)
            .attr('fill', 'none')
            .attr('stroke', (_, i) => {
                return 'black';
            })
            .attr('stroke-width', 3)
            .transition().duration(500)
            .attr('d', (d) => line(d))
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
        this.updateLines();
    }

    render() {
        return (
            <div className="lda__chart">
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