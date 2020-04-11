import React, {Component} from 'react';
import {SVMChart} from './svmChart';
import {SVMSlider} from './svmSlider';
import { Header } from 'semantic-ui-react';
import './svm.css';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

export class SVM extends Component {
    constructor() {
        super();
        this.state = {
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
        };
    };

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
                        <Button style={{ width: '40%' }} variant="contained" color="primary" >
                            Train
                        </Button>
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