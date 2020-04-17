import React, { Component } from "react";
import "react-bootstrap";
import CheckBoxGroup from "../../component/CheckBoxGroup/CheckBoxGroup";
import { RadioGroup, Radio } from "react-radio-group";
import "bootstrap/dist/css/bootstrap.min.css";

class FilterBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: false
        };
    }
    createCheckBoxes = () => {
        return (
            <CheckBoxGroup
                columns={this.props.columns}
                updateColumns={this.props.updateColumns}
            />
        );
    };

    collapse = () => {
        this.setState({ clicked: !this.state.clicked });
    };

    render() {
        return this.state.clicked ? (
            <div className="w-100 center fixed bottom-0 bg-light-blue container-fluid">
                <div className="row pointer ba" onClick={this.collapse}>
                    <h5 className="center">Collapse</h5>
                </div>

                <div className="row">
                    <div className="center bb br col-6">Show/Hide Columns</div>
                    <div className="center bb col-6">Search Methods:</div>
                </div>
                <div className="row">
                    <div className="col-6 br">
                        <div>{this.createCheckBoxes()}</div>
                    </div>
                    <div className="col-6 justify-content-center">
                        <div className="tl">
                            <RadioGroup
                                name="searchMethod"
                                selectedValue={this.props.selectedValue}
                                onChange={this.props.updateSearchMethod}
                            >
                                <Radio value="regex" />
                                <span> Regex (case insensitive) </span>
                                <br />
                                <Radio value="case" />
                                <span> Regex (case sensitive) </span>
                                <br />
                                <Radio value="length gt" />
                                <span> Length (Greater Than) </span>
                                <br />
                                <Radio value="length lt" />
                                <span> Length (Less Than) </span>
                                <br />
                                <Radio value="length lt gt" />
                                <span> Length min, max </span>
                                <br />
                                <Radio value="char count lt" />
                                <span> Character Count (Less Than)* </span>
                                <br />
                                <Radio value="char count gt" />
                                <span> Character Count (Greater Than)* </span>
                                <br />
                            </RadioGroup>
                            <h7>
                                * input the character you want then the count{" "}
                                <br /> with a space inbetween e.g. <q>x 2</q>
                            </h7>
                        </div>
                    </div>
                </div>
                <div />
            </div>
        ) : (
            <div
                className="w-100 center fixed bottom-0 bg-light-blue container-fluid pointer"
                onClick={this.collapse}
            >
                <h1 className="center">Filter Options</h1>
            </div>
        );
    }
}

export default FilterBar;
