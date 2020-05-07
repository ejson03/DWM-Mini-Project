import React, { Component } from "react";
import {BarChart} from './bar';
import {LineChart} from './line';
import {PieChart} from './pie';
import {DoughnutChart} from './doughnut';

export class Graphs extends Component {
  render() {
      if (this.props.chart === "Bar") {
          return (
                  <div>
                  <BarChart
                    data={this.props.data}
                    columns={this.props.columns}
                  />
                  </div>
                      
          );
      } else if (this.props.chart === "Line") {
        return (
          <div>
            
          <LineChart
            data={this.props.data}
            columns={this.props.columns}
          />
          </div>
        
              
      );
      }  else if (this.props.chart === "Pie") {
        return (
          
          <div>
          <PieChart
            data={this.props.data}
            columns={this.props.columns}
          />
          </div>
              
      );
      }  else if (this.props.chart === "Doughnut") {
        return (
          <div>
            
          <DoughnutChart
            data={this.props.data}
            columns={this.props.columns}
          />
          </div>
              
      );
      }
  }
}

