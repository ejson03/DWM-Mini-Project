import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import { PROXY_URL } from '../misc/ProxyURL';
import { MiniNavBar } from './NavBar';
import axios from 'axios';

export class NBTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: [],
            uploadStatus: ''
        };
    };

    handleSubmit() {
        axios.get(PROXY_URL + '/test/nb')
            .then((res) => {
                if(res.status === 200){
                    let uploadStatus = 'Success!';
                    console.log(uploadStatus)
                    this.setState({ uploadStatus });
                    console.log(res)
                    this.setState({ result: res.data });
                }else{
                    let uploadStatus = '😱 Something Went Wrong!';
                    console.log(uploadStatus)
                    this.setState({ uploadStatus });
                }
            }).catch((error) => {
                let uploadStatus = error.toString( );
                uploadStatus = uploadStatus + ' 😱';
                console.log(uploadStatus)
                this.setState({ uploadStatus });
            });
    }

    render() {
        return (
            <div>
                <MiniNavBar />
                <br /><br />
                <Header size='huge'>
                    Naive Bayes:
                </Header>
                <br /><br />
                <Grid container spacing={0}>
                <Grid item xs={6} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'left'
                }}>
                    <Header size = 'huge'>
                        Test:
                    </Header>
                    <br />
                    <form onSubmit={this.handleSubmit.bind(this)} method="GET">
                        <Button type="submit" value="Submit" style={{ width: '21%' }} variant="contained" color="primary">Test</Button>
                    </form>
                    <Typography variant={"h6"} gutterBottom>
                        <b>{this.state.uploadStatus}</b>
                    </Typography>
                    <br/>
                </Grid>
                <Grid item xs={6} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'left'
                }}>
                    <Header size = 'huge'>
                        Result:
                    </Header>
                </Grid>
            </Grid>
        </div>
        );
    }
};