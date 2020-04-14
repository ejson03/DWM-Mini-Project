import React, {Component} from 'react';
import {SVMChart} from './svmChart';
import {SVMSlider} from './svmSlider';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Header } from 'semantic-ui-react';
import {PROXY_URL} from '../misc/proxyURL';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import './svm.css';

export class SVM extends Component {
    constructor(props) {
        super(props);
        this.state = {
            testSplit: '0.2',
            penalty: 'l1',
            c: '1'
        }
    }

    handleSubmit(e){
        e.preventDefault();
        console.log(this.state.testSplit, this.state.penalty, this.state.c);
        
        axios({
          method: "POST",
          url:PROXY_URL + "/train/svm", 
          data:  [this.state.testSplit, this.state.penalty, this.state.c]
        }).then((response)=>{
          console.log(response);
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
                <Header className='title'
                        size='huge'>
                    Support Vector Machine
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
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Penalty</FormLabel>
                            <RadioGroup aria-label="penalty" name="penalty" required value={this.state.penalty} onChange={this.onPenaltyChange.bind(this)}>
                                <FormControlLabel value="l1" control={<Radio />} label="L1" />
                                <FormControlLabel value="l2" control={<Radio />} label="L2" />
                            </RadioGroup>
                        </FormControl>
                        <br /><br />
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
                        <br /><br />
                        <Button type="submit" value="Submit" variant="contained" color="primary">Train</Button>
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