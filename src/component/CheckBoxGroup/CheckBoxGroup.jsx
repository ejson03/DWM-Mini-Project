import React, { Component } from "react";
import CheckBox from "rc-checkbox";
import "bootstrap/dist/css/bootstrap.min.css";

const CheckBoxGroup = props => {
    const makeBoxes = () => {
        let newArray = [];
        //get pairs of two from column names
        for (let i = 0; i < props.columns.length; i += 2) {
            newArray.push(props.columns.slice(i, i + 2));
        }
        return newArray.map((col, i) => {
            try {
                return (
                    <div className="row" key={i}>
                        <label className="col-6">
                            <CheckBox
                                defaultChecked={1}
                                value={col[0].Header}
                                onChange={props.updateColumns}
                            />
                            {"   "}
                            {col[0].Header}
                        </label>
                        <label className="col-6">
                            <CheckBox
                                defaultChecked={1}
                                value={col[1].Header}
                                onChange={props.updateColumns}
                            />
                            {"   "}
                            {col[1].Header}
                        </label>
                    </div>
                );
            } catch (e) {
                return (
                    <div className="row" key={i}>
                        <label className="col">
                            <CheckBox
                                defaultChecked={1}
                                value={col[0].Header}
                                onChange={props.updateColumns}
                            />
                            {"   "}
                            {col[0].Header}
                        </label>
                    </div>
                );
            }
        });
    };

    return <div className="tl">{makeBoxes()}</div>;
};

export default CheckBoxGroup;
