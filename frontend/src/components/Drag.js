import React, { Component } from 'react'
import {DropzoneDialog} from 'material-ui-dropzone'
import Button from '@material-ui/core/Button';

export default class Drag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            files: []
        };
    }

    handleClose() {
        this.setState({
            open: false
        });
    }

    handleSave(files) {
        //Saving files to state for further use and closing Modal.
        this.setState({
            files: files,
            open: false
        });
    }

    handleOpen() {
        this.setState({
            open: true,
        });
    }

    render() {
        return (
            <div>
                <div style={{ textAlign: 'center' }}>
                <Button variant="contained" color="primary"onClick={this.handleOpen.bind(this)}>
                    Upload Dataset
                </Button>
                </div>
                
                <DropzoneDialog
                    open={this.state.open}
                    onSave={this.handleSave.bind(this)}
                    acceptedFiles={['.csv', '.json', '.yml']}
                    showPreviews={true}
                    cancelButtonText={"cancel"}
                    submitButtonText={"submit"}
                    maxFileSize={5000000}
                    onClose={this.handleClose.bind(this)}
                    showFileNamesInPreview={true}
                />
            </div>
        );
    }
}