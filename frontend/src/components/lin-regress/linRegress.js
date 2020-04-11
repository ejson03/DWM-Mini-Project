import React, {Component} from 'react';
import { Header } from 'semantic-ui-react';
import './linRegress.css';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

export class LinRegress extends Component {
    constructor() {
        super();
        this.state = {
            points: [{x: 1, y: 2}, {x: 2, y: 1}, {x: 3, y: 4}],
            metadata: {
                bestFitLine: [{x: 1, y: 1.33}, {x: 3, y: 3.33}],
                m: 1,
                b: 0.33,
                residual: 2.67
            },
            toggle: 0
        };
    };

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