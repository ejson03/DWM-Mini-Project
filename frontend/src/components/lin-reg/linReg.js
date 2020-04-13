import React, {Component} from 'react';
import { Header } from 'semantic-ui-react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {PROXY_URL} from '../misc/proxyURL';
import DiscreteSlider from '../discreateslider/discreateslider';
import './linReg.css';

export class LinReg extends Component {
    constructor() {
        super();
        this.state = {
            // points: [{x: 1, y: 2}, {x: 2, y: 1}, {x: 3, y: 4}],
            // metadata: {
            //     bestFitLine: [{x: 1, y: 1.33}, {x: 3, y: 3.33}],
            //     m: 1,
            //     b: 0.33,
            //     residual: 2.67
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
                    Linear Regression
                </Header>
                <Grid style={{ marginTop: '500px' }} container spacing={0}>
                    <Grid item xs={3} style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'left'
                    }}>
                        <form onSubmit={this.handleSubmit}>
                            <DiscreteSlider name={'Test Split'} defaultValue={0.2} step={0.1} min={0} max={1}/>
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