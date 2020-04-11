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

export class SVMChart extends Component {
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
            .concat(this.props.boundaryLine)
            .concat(this.props.upperLine)
            .concat(this.props.lowerLine);
        
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
                if (d.label === 1)
                    return "red";
                else
                    return "blue";
            })
            .attr('label', (d) => d.label)
            .transition().duration(500)
            .attr('cx', (d) => this.xScale(d.x))
            .attr('cy', (d) => this.yScale(d.y))

        circles.exit().remove();
    }

    updateLines() {
        const allPoints = [this.props.boundaryLine, this.props.upperLine, this.props.lowerLine];

        const line = d3.line()
            .x((d) => this.xScale(+d.x))
            .y((d) => this.yScale(+d.y))
            .curve(d3.curveMonotoneX);

        let svmLines = d3.select(this.chartArea)
            .selectAll('path')
            .data(allPoints);
        
        svmLines.enter().append('path')
            .merge(svmLines)
            .attr('class', (_, i) => {
                if (i !== 0)
                    return 'dashed';
            })
            .attr('fill', 'none')
            .attr('stroke', (_, i) => {
                return this.props.colors[i];
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
            <div className="svm__chart">
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