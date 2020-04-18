import React from "react";

const FileCard = props => {
    return (
        <div className="s12 m7 center ">
            <div className="card horizontal">
                <div className="card-image bg-washed-red shadow-5">
                    <h1>
                        Welcome! <br />
                        Open up a csv file to start!
                    </h1>
                </div>
                <div className="card-stacked bg-washed-red shadow-5">
                    <div className="card-action">
                        <label className="btn btn-default btn-file w-30 grow f4 link ph3 pv2 dib white bg-light-purple">
                            Browse{" "}
                            <input
                                type="file"
                                style={{ display: "none" }}
                                id="FileUpload"
                                onChange={props.onSubmit}
                            />
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FileCard;
