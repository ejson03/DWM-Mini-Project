import React, {Component} from 'react';
import { Header } from 'semantic-ui-react';
import './lda.css';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

export class LDA extends Component {
    constructor() {
        super();
        this.state = {
            means: [],
            covarianceMatrices: [],
            metadata: {
                points: [],
                line: []
            },
            toggle: 0
        };
    };

    render() {
        return (
            <div>
                <Header className='title'
                        size='huge'
                >
                    Linear Discriminant Analysis
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