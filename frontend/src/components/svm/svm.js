import React, {Component} from 'react';
import {SVMChart} from './svmChart';
import {SVMSlider} from './svmSlider';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Header } from 'semantic-ui-react';
import {PROXY_URL} from '../misc/proxyURL';
import Penalty from '../penalty/penalty';
import DiscreteSlider from '../discreateslider/discreateslider';
import './svm.css';

export class SVM extends Component {
    constructor() {
        super();
        this.state = {
            // points: [{x: 1, y: 2, label: 1}, {x: 2, y: 1, label: -1}, {x: 3, y: 4, label: 1}],
            // c: 1,
            // metadata: {
            //     boundaryLine: [{x: 0.0, y: 0.0}, {x: 4.0, y: 3.996}],
            //     upperLine: [{x: 0.0, y: 0.9995}, {x: 4.0, y: 4.9955}], 
            //     lowerLine: [{x: 0.0, y: -0.9995}, {x: 4.0, y: 2.9965}],
            //     colors: ['#000000', '#FF0000', '#0000FF'],
            //     accuracy: '100.00%'
            // },
            // toggle: 0
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleSubmit(event) {
        event.preventDefault();
        
        const data = new FormData(event.target);
        
        fetch(PROXY_URL + '/train/svm', {
          method: 'POST',
          body: data,
        });
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
                    <form onSubmit={this.handleSubmit}>
                        <Penalty/>
                        <br /><br />
                        <DiscreteSlider name={'Test Split'} defaultValue={0.2} step={0.1} min={0} max={1}/>
                        <br /><br />
                        <DiscreteSlider name={'C'} defaultValue={1} step={0.1} min={0} max={1}/>
                        <br /><br />
                        <Button type="submit" value="Submit" variant="contained" color="primary">Train</Button>
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