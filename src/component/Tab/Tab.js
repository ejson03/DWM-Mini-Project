import React, { Component } from "react";

class Tab extends Component {
    render() {
        return (
            <div
                onClick={() => this.props.changeTab(this.props.label)}
                className={this.props.classes}
            >
                <h3>{this.props.label}</h3>
            </div>
        );
    }
}

export default Tab;
