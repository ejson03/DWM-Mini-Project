import React, {Component} from 'react';
import { Header } from 'semantic-ui-react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import DiscreteSlider from '../discreateslider/discreateslider';
import {PROXY_URL} from '../misc/proxyURL';
import './kmeans.css';

const colors = [
    'red',
    'green',
    'blue',
    'orange',
    'green',
    'sienna',
    'peachpuff',
    'purple',
    'pink',
    'turquoise'
];

export class KMeans extends Component {
    constructor() {
        super();
        this.state = {
            // points: [{x: 1, y: 2, label: 0}, {x: 2, y: 1, label: 0}, {x: 3, y: 4, label: 0}],
            // k: 1,
            // centroids: [{x: 2.0, y: 2.3333333333333335, label: 0}],
            // toggle: 0
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleSubmit(event) {
        event.preventDefault();
        
        const data = new FormData(event.target);
        
        fetch(PROXY_URL + '/train/kmeans', {
          method: 'POST',
          body: data,
        });
    }

    render() {
        return (
            <div>
                <Header className='title'
                        size='huge'
                >
                    K-Means
                </Header>
                <Grid style={{ marginTop: '500px' }} container spacing={0}>
                    <Grid item xs={3} style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'left'
                    }}>
                        <form onSubmit={this.handleSubmit}>
                            <DiscreteSlider name={'K'} defaultValue={2} step={1} min={2} max={10}/>
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