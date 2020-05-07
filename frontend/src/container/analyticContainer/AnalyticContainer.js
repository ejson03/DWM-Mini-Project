import React, { Component } from "react";
import Table from "../table/Table";
import {Graphs} from "../../component/graphs/Graphs";
import FileCard from "../../component/fileCard/FileCard";
import Scroll from "../scroll/Scroll";
import FilterBar from "../filterBar/FilterBar";
import {GraphBar} from '../../component/graphs/GraphBar';


class AnalyticContainer extends Component {
    render() {
        if (this.props.activeTab === "Table") {
            return (
                    <div>
                    { this.props.openFile !== "" ? (
                            <Scroll className="absolute pa5 row pagination-centered">
                                <Table
                                    columns={this.props.columns}
                                    data={this.props.data}
                                    defaultFilterMethod={this.props.defaultFilterMethod}
                                />
                            </Scroll>
                        ) : (
                                <div className="center pa7 db row">
                                    <FileCard onSubmit={this.props.uploadFile}/>
                                </div>
                        )
                    }
                        <br /><br /><br />
                        <div className="w-100 row">
                            <FilterBar
                                visibleColumns={this.props.visbleColumns}
                                columns={this.props.columns}
                                updateColumns={this.props.updateColumns}
                                updateSearchMethod={this.props.updateSearchMethod}
                                selectedValue={this.props.searchMethod}
                            />
                        </div>
                </div>
                        
            );
        } else if (this.props.activeTab === "Graphs") {
            return (
            <div>
                <div>
                <GraphBar
                      changeChart={this.props.changeChart}
                      chart={this.props.chart}
                    />
                </div>
               <Graphs
                    changeChart={this.props.changeChart} 
                    chart={this.props.chart}
                    data={this.props.data}
                    columns={this.props.visibleColumns}
                />
            </div>
            );
        }
    }
}

export default AnalyticContainer;