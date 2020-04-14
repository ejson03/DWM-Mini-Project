import React from 'react';
import { Header } from 'semantic-ui-react';
import Button from "@material-ui/core/Button";
import { PROXY_URL } from '../misc/proxyURL';
import './homePage.css';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.uploadFile = this.uploadFile.bind(this);
    }

    uploadFile(ev) {
        ev.preventDefault();

        const data = new FormData();
        data.append('file', this.uploadInput.files[0]);

        fetch(PROXY_URL + '/upload', {
            method: 'POST',
            body: data,
        });
    }

    render() {
        return ( <
            div className = 'home-page' >
            <
            Header size = 'huge' >
            Welcome to the Classical Machine Learning Visualizer!
            <
            /Header> <
            br / >
            <
            Header size = 'huge' >
            Upload the dataset( in csv, json or yaml) on which you would like to visualize the Machine Learning models. <
            /Header> <
            br / >
            <
            form onSubmit = { this.uploadFile } >
            <
            div >
            <
            input accept = ".csv, .json, .yml"
            single ref = {
                (ref) => { this.uploadInput = ref; }
            }
            type = "file" / >
            <
            /div> <
            br / >
            <
            div >
            <
            Button type = "submit"
            valud = "Submit"
            variant = "contained"
            color = "primary" > Submit < /Button> < /
            div > <
            /form> < /
            div >
        );
    }
}

export default HomePage;