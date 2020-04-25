import React, { Component } from "react";
import Table from "../table/Table";
import Graphs from "../graphs/Graphs";

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
        } else if (this.props.activeTab === "Graphs") {
            return <Graphs />;
        }
    }
}

export default AnalyticContainer;