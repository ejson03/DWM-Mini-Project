import React, { Component } from "react";
import Tab from "../tab/Tab";

export class GraphBar extends Component {
    render() {
        const active =
            "col-md-2 br2 ba bg-light-blue shadow-6 center pv2 h-100";
        const inactive =
            "col-md-2 br2 ba bg-lightest-blue shadow-1 center pv2 pointer h-100";
        return (
            <div className="row">
                <Tab
                    label="Bar"
                    changeTab={this.props.changeChart}
                    classes={this.props.chart === "Bar" ? active : inactive}
                />
                <Tab
                    label="Line"
                    classes={this.props.chart === "Line" ? active : inactive}
                    changeTab={this.props.changeChart}
                />
                <Tab
                    label="Pie"
                    classes={this.props.chart === "Pie" ? active : inactive}
                    changeTab={this.props.changeChart}
                />
                <Tab
                    label="Doughnut"
                    classes={this.props.chart === "Doughnut" ? active : inactive}
                    changeTab={this.props.changeChart}
                />
            </div>
        );
    }
}

