import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { PROXY_URL } from '../misc/proxyURL';
import TextField from '@material-ui/core/TextField';
import { NavBar } from '../secNavBar/secNavBar';
import axios from 'axios';
import './linReg.css';

export class LinReg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            testSplit: 0.2,
            res: [],
        };
    };

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state.testSplit);

        axios({
            method: "POST",
            url: PROXY_URL + "/train/lr",
            data: [this.state.testSplit]
        }).then((response) => {
            if(response.status === 200){
            console.log("SUCCESSS")
            console.log(response)
            this.setState({res: response.body.data});   
        }else
            console.log("SOMETHING WENT WRONG")
        })
    }

    onTestSplitChange(event) {
        this.setState({ testSplit: event.target.value })
    }

    render() {
        return (
            <div>
                <Header className='title'
                        size='huge'>
                    Linear Regression
                </Header>
                <Grid style={{ marginTop: '50px' }} container spacing={0}>
                <Grid item xs={3} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'left'
                }}>
                    <form onSubmit={this.handleSubmit.bind(this)} method="POST">
                        <Button type="submit" style={{ width: '40%' }} value="Submit" variant="contained" color="primary">Train</Button>
                        <br /><br /><br />
                        <div>
                            <TextField
                                id="testSplit"
                                label="TestSplit (0 > Value > 1)"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                defaultValue={'0.2'}
                                required
                                value={this.state.testSplit}
                                onChange={this.onTestSplitChange.bind(this)}
                            />
                        </div>
                        <br /><br />
                    </form>
                </Grid>
                <Grid item xs={3} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    
                </Grid>
                <Grid item xs={3} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end'
                }}>
                    <Button type="submit" style={{ width: '40%' }} variant="contained" color="primary" >Test</Button>
                    <br/>
                    <Button type="sublit" style={{ width: '40%' }} variant="contained" color="primary" >
                        Result
                    </Button>
                </Grid>
            </Grid>
        </div>
        );
    }
};