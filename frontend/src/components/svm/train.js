import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { PROXY_URL } from '../misc/proxyURL';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { MiniNavBar } from './navBar';
import axios from 'axios';

export class SVMTrain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            testSplit: '0.2',
            penalty: 'l2',
            c: '1',
            result: [],
        };
    };

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state.testSplit, this.state.penalty, this.state.c);

        axios({
            method: "POST",
            url: PROXY_URL + "/train/svm",
            data: [this.state.testSplit, this.state.penalty, this.state.c]
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
        this.setState({testSplit: event.target.value})
    }

    onPenaltyChange(event) {
        this.setState({penalty: event.target.value})
    }

    onCChange(event) {
        this.setState({c: event.target.value})
    }

    render() {
        return (
            <div>
                <MiniNavBar />
                <br /><br />
                <Header size='huge'>
                    Support Vector Machine:
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
                        <br /><br />
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Penalty</FormLabel>
                            <RadioGroup aria-label="penalty" required value={this.state.penalty} onChange={this.onPenaltyChange.bind(this)}>
                                <FormControlLabel default value="l1" control={<Radio />} label="L1" />
                                <FormControlLabel value="l2" control={<Radio />} label="L2" />
                            </RadioGroup>
                        </FormControl>
                        <br /><br /><br />
                        <div>
                            <TextField
                                id="c"
                                label="C (0 > Value > 1)"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                defaultValue={1}
                                required
                                value={this.state.c}
                                onChange={this.onCChange.bind(this)}
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