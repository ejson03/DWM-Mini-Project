import React, { Component } from "react";
import Tab from "../../compo/Tab/Tab";

class TabBar extends Component {x
    render() {
        const active =
            "col-md-4 br2 ba bg-light-blue shadow-6 center pv2 h-100";
        const inactive =
            "col-md-4 br2 ba bg-lightest-blue shadow-1 center pv2 pointer h-100";
        return (
            <div className="row">
                <Tab
                    label="Table"
                    changeTab={this.props.changeTab}
                    classes={this.props.active === "Table" ? active : inactive}
                />
                />
            </div>
        );
    }
}

export default TabBar;
