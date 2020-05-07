import React, { Component } from "react";
import TabBar from "../../container/tabBar/TabBar";
import AnalyticContatiner from "../../container/analyticContainer/AnalyticContainer";
import matchSorter from "match-sorter";
import { PROXY_URL } from '../misc/ProxyURL';
import "bootstrap/dist/css/bootstrap.min.css";
import './ViewCSV.css';
import "tachyons";

export class ViewCSV extends Component {
    constructor() {
        super();
        this.state = {
            activeTab: "Table",
            openFile: "",
            columns: [],
            data: [],
            visibleColumns: [],
            searchMethod: "regex",
            chart: "Bar"
        };
    }

    changeTab = route => {
        if (route !== this.state.activeTab) {
            this.setState({ activeTab: route });
        }
    };

    changeChart = route => {
        if(route !== this.state.chart){
            this.setState({chart: route})
        }
    }

    uploadFile = () => {
        const input = document.getElementById("FileUpload");
        const reader = new FileReader();
        reader.onload = () => {
            const data = reader.result;
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            fetch(PROXY_URL + "/dataset",{
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify({ data: data })
            }).then(res => {
                res.json().then(data => {
                    console.log(data.columns)
                    this.createTable(data)
                });
            });
        };
        reader.readAsText(input.files[0]);
        this.setState({ openFile: input.files[0] });
    };

    createTable = tableData => {
        const data = tableData;
        data.columns.map(obj => {
            let o = Object.assign({}, obj);
            o.filterMethod = (filter, rows) =>
                matchSorter(rows, filter.value, { keys: ["lastName"] });
            o.filterAll = true;
            return o;
        });
        this.setState({
            columns: data.columns,
            data: data.data,
            visibleColumns: data.columns.map(col => {
                return col.Header;
            })
        });
    };

    updateColumns = e => {
        if (e.target.checked === false) {
            this.setState({
                visibleColumns: this.state.visibleColumns.filter(col => {
                    console.log(col);
                    console.log(e.target.value);
                    return col !== e.target.value;
                })
            });
        } else {
            this.setState({
                visibleColumns: this.state.visibleColumns.concat(
                    String(e.target.value)
                )
            });
        }
    };

    defaultFilterMethod = selector => {
        switch (selector) {
        default:
            return (filter, row) => {
                try {
                    return String(row[filter.id])
                        .toLowerCase()
                        .search(filter.value.toLowerCase()) === -1
                        ? false
                        : true;
                } catch (e) {
                    return false;
                }
            };

        case "length lt":
            return (filter, row) => {
                try {
                    return (
                        String(row[filter.id]).length <=
                            Number(filter.value)
                    );
                } catch (e) {
                    console.log(e);
                    return false;
                }
            };
        case "length gt":
            return (filter, row) => {
                try {
                    return (
                        String(row[filter.id]).length >=
                            Number(filter.value)
                    );
                } catch (e) {
                    console.log(e);
                    return false;
                }
            };
        case "length lt gt":
            return (filter, row) => {
                try {
                    let index = filter.value.indexOf(" ");
                    let lt = filter.value.slice(0, index);
                    let gt = filter.value.slice(index + 1);
                    return (
                        String(row[filter.id]).length >= Number(lt) &&
                            String(row[filter.id]).length <= Number(gt)
                    );
                } catch (e) {
                    return false;
                }
            };
        case "case":
            return (filter, row) => {
                try {
                    return String(row[filter.id]).search(filter.value) ===
                            -1
                        ? false
                        : true;
                } catch (e) {
                    return false;
                }
            };
        case "char count gt":
            return (filter, row) => {
                try {
                    let index = filter.value.indexOf(" ");
                    let char = filter.value.slice(0, index);
                    return (
                        String(row[filter.id]).split(char).length - 1 >=
                            Number(filter.value.slice(index + 1))
                    );
                } catch (e) {
                    return false;
                }
            };
        case "char count lt":
            return (filter, row) => {
                try {
                    let index = filter.value.indexOf(" ");
                    let char = filter.value.slice(0, index);
                    return (
                        String(row[filter.id]).split(char).length - 1 <=
                            Number(filter.value.slice(index + 1))
                    );
                } catch (e) {
                    return false;
                }
            };
        }
    };

    updateSearchMethod = newMethod => {
        this.setState({ searchMethod: newMethod });
    };

    render() {
        return (
            <div className="App container-fluid">
                <TabBar
                    changeTab={this.changeTab}
                    active={this.state.activeTab}
                    style={{ zIndex: 1 }}
                />
                <br />
                <AnalyticContatiner
                    activeTab={this.state.activeTab}
                    data={this.state.data}
                    openFile={this.state.openFile}
                    columns={this.state.columns.filter(col => {
                        return this.state.visibleColumns.includes(
                            col.Header
                        );
                    })}
                    visibleColumns={this.state.visibleColumns}
                    style={{ zIndex: -1 }}
                    defaultFilterMethod={this.defaultFilterMethod(
                        this.state.searchMethod
                    )}
                    updateColumns={this.updateColumns}
                    updateSearchMethod={this.updateSearchMethod}
                    searchMethod={this.state.searchMethod}
                    uploadFile={this.uploadFile}
                    chart={this.state.chart}
                    changeChart={this.changeChart}
                />
            </div>
        );
    }
}

