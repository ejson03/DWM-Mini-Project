import React, {Component} from 'react';
import { Header } from 'semantic-ui-react';
import './kmeans.css';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

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
            points: [{x: 1, y: 2, label: 0}, {x: 2, y: 1, label: 0}, {x: 3, y: 4, label: 0}],
            k: 1,
            centroids: [{x: 2.0, y: 2.3333333333333335, label: 0}],
            toggle: 0
        };
    };

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