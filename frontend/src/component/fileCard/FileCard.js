import React from "react";

const FileCard = props => {
    return (
        <div className="center">
            <div 
                className="card horizontal center col-xs-10 col-md-6 col-xl-6 col-lg-6"
                style={{
                    background: '#3f51b5',
                    color: 'white',
                    transition: "0.3s",
                    boxShadow: "0 12px 40px -12px rgba(0,0,0,0.3)",
                    "&:hover": {
                    boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
                }}}
            >
                <div className="card-image">
                    <br />
                    <h1>
                        Select a dataset (.csv) to open it!
                    </h1>
                    <br />
                </div>
                <div className="card-stacked">
                    <div className="card-action">
                        <label className="btn btn-default grow" style={{ background: '#3f51b5', color: 'white', borderStyle: 'solid', borderColor: 'white' }}>
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
