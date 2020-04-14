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
import {Points} from './points'
import {AddPointForm} from './addPointForm';
import axios from 'axios';
import './svm.css';

export class SVM extends Component {

    constructor(props) {
        super(props);
        this.state = {
            testSplit: '0.2',
            penalty: 'l1',
            cValue: '1',
            points: [{x: 1, y: 2, label: 1}, {x: 2, y: 1, label: -1}, {x: 3, y: 4, label: 1}],
            c: 1,
            metadata: {
                boundaryLine: [{x: 0.0, y: 0.0}, {x: 4.0, y: 3.996}],
                upperLine: [{x: 0.0, y: 0.9995}, {x: 4.0, y: 4.9955}], 
                lowerLine: [{x: 0.0, y: -0.9995}, {x: 4.0, y: 2.9965}],
                colors: ['#000000', '#FF0000', '#0000FF'],
                accuracy: '100.00%'
            },
            toggle: 0
        }
    }

    handleSubmit(e){
        e.preventDefault();
        console.log(this.state.testSplit, this.state.penalty, this.state.cValue);
        
        axios({
          method: "POST",
          url:PROXY_URL + "/train/svm", 
          data:  [this.state.testSplit, this.state.penalty, this.state.cValue]
        }).then((response)=>{
            if(response.status === 200){
                console.log("SUCCESSS")
                console.log(response)
                //return response;     
            }else
                console.log("SOMETHING WENT WRONG")
        })
    }git
    
      onTestSplitChange(event) {
        this.setState({testSplit: event.target.value})
      }
    
      onPenaltyChange(event) {
        this.setState({penalty: event.target.value})
      }
    
      onCValueChange(event) {
        this.setState({cValue: event.target.value})
      }

    render() {
        return (
            <div>
                <Header className='title'
                        size='huge'>
                    Support Vector Machine
                </Header>
                <div className="svm">
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
                        c={this.state.c}
                    />
                    <Header className='svm__stats'
                            size='small'
                    >
                        SVM Accuracy: {this.state.metadata.accuracy}
                    </Header>
                    <SVMSlider 
                        c={this.state.c}
                        updateC={
                            newC => this.setState({
                                c: newC
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
                    <SVMChart 
                        points={this.state.points}
                        boundaryLine={this.state.metadata.boundaryLine}
                        upperLine={this.state.metadata.upperLine}
                        lowerLine={this.state.metadata.lowerLine}
                        colors={this.state.metadata.colors}
                    />
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
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Penalty</FormLabel>
                            <RadioGroup aria-label="penalty" name="penalty" required value={this.state.penalty} onChange={this.onPenaltyChange.bind(this)}>
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
                                value={this.state.cValue}
                                onChange={this.onCValueChange.bind(this)}
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