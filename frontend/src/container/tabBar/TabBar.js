import React, { Component } from "react";
import Tab from "../../component/tab/Tab";

class TabBar extends Component {x
    render() {
        const active =
            "w-97 br2 ba bg-custom text-white shadow-6 center pv2 h-100";
        const inactive =
            "w-97 br2 ba bg-custom text-white shadow-1 center pv2 pointer h-100";
        return (
            <div className="row">
                <Tab
                    label="Table"
                    changeTab={this.props.changeTab}
                    classes={this.props.active === "Table" ? active : inactive}
                />
            </div>
        );
    }
}

export default TabBar;