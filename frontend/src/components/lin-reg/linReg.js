import React, {Component} from 'react';
import { Header } from 'semantic-ui-react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {PROXY_URL} from '../misc/proxyURL';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import './linReg.css';

export class LinReg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            testSplit: '0.2'
        }
    }

    handleSubmit(e){
        e.preventDefault();
        console.log(this.state.testSplit);
        
        axios({
          method: "POST",
          url:PROXY_URL + "/train/lin-reg", 
          data:  [this.state.testSplit]
        }).then((response)=>{
          console.log(response);
        })
      }
    
    onTestSplitChange(event) {
        this.setState({testSplit: event.target.value})
    }

    render() {
        return (
            <div>
                <Header className='title'
                        size='huge'>
                    Linear Regression
                </Header>
                <Grid style={{ marginTop: '500px' }} container spacing={0}>
                    <Grid item xs={3} style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'left'
                    }}>
                        <form onSubmit={this.handleSubmit.bind(this)} method="POST">
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
                            <Button type="submit" value="Submit" variant="contained" color="primary">Train</Button>
                        </form>
                    </Grid>
                    <Grid item xs={3} style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <Button style={{ width: '40%' }} variant="contained" color="primary" >
                            Test 
                        </Button>
                    </Grid>
                    <Grid item xs={3} style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-end'
                    }}>
                        <Button style={{ width: '40%' }} variant="contained" color="primary" >
                            Result
                        </Button>
                    </Grid>
                </Grid>
            </div>
        );
    }
};