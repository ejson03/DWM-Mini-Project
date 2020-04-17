import React, { Component } from "react";
import Table from "../Table/Table";
import Graphs from "../Graphs/Graphs";
import Stats from "../Stats/Stats";

class AnalyticContainer extends Component {
    render() {
        if (this.props.activeTab === "Table") {
            return (
                <div className="bg-lightest-blue ba shadow-5 br3" id="Table">
                    <Table
                        columns={this.props.columns}
                        data={this.props.data}
                        defaultFilterMethod={this.props.defaultFilterMethod}
                    />
                </div>
            );
        } else if (this.props.activeTab === "Stats") {
            return <Stats />;
        } else if (this.props.activeTab === "Graphs") {
            return <Graphs />;
        }
    }
}

export default AnalyticContainer;
