import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { PROXY_URL } from '../misc/proxyURL';
import TextField from '@material-ui/core/TextField';
import { MiniNavBar } from './navBar';
import axios from 'axios';

export class LinRegTrain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            testSplit: 0.2,
            result: [],
        };
    };

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state.testSplit);

        axios({
            method: "POST",
            url: PROXY_URL + "/train/linreg",
            data: [this.state.testSplit]
        }).then((res) => {
            if(res.status === 200){
            console.log("SUCCESSS")
            const result = res.data;
            console.log(result)
            this.setState({ result });
            console.log(this.result)
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
                <MiniNavBar />
                <br /><br />
                <Header size='huge'>
                    Linear Regression:
                </Header>
                <br /><br />
                <Grid container spacing={0}>
                <Grid item xs={6} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'left'
                }}>
                    <Header size = 'huge'>
                        Insert Hyperparameters:
                    </Header>
                    <br />
                    <form onSubmit={this.handleSubmit.bind(this)} method="POST">
                        <Button type="submit" value="Submit" style={{ width: '21%' }} variant="contained" color="primary">Train</Button>
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
                    </form>
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