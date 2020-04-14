import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { PROXY_URL } from '../misc/proxyURL';
import TextField from '@material-ui/core/TextField';
import {Points} from './points'
import {AddPointForm} from './addPointForm';
import {LinRegressChart} from './linRegChart';
import axios from 'axios';
import './linReg.css';

export class LinReg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            testSplit: 0.2,
            points: [{x: 1, y: 2}, {x: 2, y: 1}, {x: 3, y: 4}],
            res: [],
            metadata: {
                bestFitLine: [{x: 1, y: 1.33}, {x: 3, y: 3.33}],
                m: 1,
                b: 0.33,
                residual: 2.67
            },
            toggle: 0
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
                <div className="lin-reg">
                    <AddPointForm 
                        points={this.state.points}
                        onNewPoint={
                            point => this.setState({
                                points: [...this.state.points, point]
                            })
                        }
                        updateMetadata={
                            newMetadata => this.setState({
                                metadata: newMetadata,
                                toggle: (this.state.toggle + 1) % 2
                            })
                        }
                    />
                    <Points 
                        points={this.state.points}
                        toggle={this.state.toggle}
                        deletePoint={
                            i => this.setState({
                                    points: this.state.points.filter((_, idx) => i !== idx),
                                    toggle: (this.state.toggle + 1) % 2
                                })
                        }
                    />
                    <LinRegressChart
                        points={this.state.points}
                        bestFitLine={this.state.metadata.bestFitLine}
                    />
                    <Header className='lin-reg__stats'
                            size='small'
                    >
                        Slope of Line: {this.state.metadata.m}
                        <br />
                        Intercept: {this.state.metadata.b}
                        <br />
                        Total Residual: {this.state.metadata.residual}
                    </Header>
                </div>
                <Grid style={{ marginTop: '50px' }} container spacing={0}>
                <Grid item xs={3} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'left'
                }}>
                    <form onSubmit={this.handleSubmit.bind(this)} method="POST">
                        <Button type="submit" value="Submit" variant="contained" color="primary">Train</Button>
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
                    <Button type="submit" variant="contained" color="primary" >Test</Button>
                </Grid>
                <Grid item xs={3} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end'
                }}>
                    <Button type="sublit"  variant="contained" color="primary" >
                        Result
                    </Button>
                </Grid>
            </Grid>
        </div>
        );
    }
};