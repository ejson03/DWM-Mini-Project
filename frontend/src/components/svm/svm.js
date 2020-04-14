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
import TrainCard from './svmTrainCard';
import axios from 'axios';
import './svm.css';

export class SVM extends Component {

    constructor(props) {
        super(props);
        this.state = {
            testSplit: '0.2',
            penalty: 'l2',
            cValue: '1',
            trainRes: [],
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
          url: PROXY_URL + "/train/svm", 
          data: [this.state.testSplit, this.state.penalty, this.state.cValue]
        }).then((res) => {
            if(res.status === 200){
                console.log("SUCCESSS")
                const trainRes = res.data;
                console.log(trainRes)
                this.setState({ trainRes });
                console.log(this.trainRes)
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
                    <TrainCard
                        classes={'1'}
                        coef={'0.0002407107355122992, 0.0001640298848997039, 0.00029742912137756077, 0.00017478939118856224, 0.00021114677738848453, 0.0002890949780024661, -0.000225774399507913, 0.0007091984336121128, 1.3860779143708396e-06, 0.000134537113425904, -0.10548480153528961, -0.0400533872358092, 0.0, 0.009182877974981254, -0.002039844148871751, -0.008272923366301393'}
                        intercept={'-0.0020364842337383397'}
                    />
                    <br />
                    <TrainCard
                        classes={'3'}
                        coef={'-0.00016213973966753653, -0.0002942696230644273, -9.897046259564987e-05, -0.00013593863847746418, -0.00026576827993298976, -0.0001511864737028354, -0.0007506234420014375, 0.00038120606843445427, -0.00013772166319611995, -0.0004316944806569276, 0.03632061374510825, 0.019129877013429525, 0.0, -0.006210739366677956, 0.001121088443817607, 0.004542482974234586'}
                        intercept={'0.0011194038091878827'}
                    />
                    <br />
                    <TrainCard
                        classes={'4'}
                        coef={'-7.221911006236145e-05, 2.9845225991719522e-06, -6.355148865900318e-05, -7.297850095317948e-05, 1.5838327220225196e-05, -1.8630815330242282e-05, 0.002344870889505712, -0.0039513444961031905, 0.00016093222705475623, 0.00031427849462772536, 0.07236711658310017, 0.03368187111883854, 0.0, -0.002408591753067729, -2.8376152352352702e-05, -5.190144042947225e-05'}
                        intercept={'-3.0395655156465205e-05'}
                    />
                    <br />
                    <TrainCard
                        classes={'5'}
                        coef={'1.0792095777044513e-06, -8.715863955423469e-07, -1.563446741068717e-06, -1.563446741068529e-06, -8.715863955429432e-07, 1.1225790388109502e-06, -1.1580528575742387e-23, -1.494208291841642e-08, 0.0, 0.0, -0.0036659225349805484, 0.011192259395435293, 0.0, -0.0006966535852556521, -0.00013954448007857262, -0.0005581948513176829'}
                        intercept={'-0.00013954448007857256'}
                    />
                    <br />
                    <TrainCard
                        classes={'7'}
                        coef={'-8.39532753604855e-05, 3.237121784412356e-06, -8.39532753604855e-05, 0.0007687135352093488, -0.0008035952154280458, 1.9363796959380743e-05, 0.0, 6.0627294103547804e-05, 0.0, -6.617444900424222e-24, -0.0034758178724291484, 0.010260953443439622, 0.0, -0.0024758213753451894, -0.0001263783538776195, -0.0005055138082904848 '}
                        intercept={'-0.00012637855026762304'}
                    />
                    <br />
                </Grid>
                <Grid item xs={3} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end'
                }}>
                    <Button type="submit" style={{ width: '40%' }} variant="contained" color="primary" >Test</Button>
                    <br/><br/>
                    <Button type="sublit" style={{ width: '40%' }} variant="contained" color="primary" >
                        Result
                    </Button>
                </Grid>
            </Grid>
        </div>
        );
    }
};