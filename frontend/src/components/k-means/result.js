import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { PROXY_URL } from '../misc/proxyURL';
import { MiniNavBar } from './navBar';
import axios from 'axios';

export class KMeansResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: [],
        };
    };

    handleSubmit() {
        axios.get(PROXY_URL + '/test/kmeans')
            .then(res => {
                const result = res.data;
                this.setState({ result });
      })
    }

    render() {
        return (
            <div>
                <MiniNavBar />
                <br /><br />
                <Header size='huge'>
                    K-Means Clustering:
                </Header>
                <br /><br />
                <Grid container spacing={0}>
                <Grid item xs={6} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'left'
                }}>
                    <Header size = 'huge'>
                        Result:
                    </Header>
                    <br />
                    <form onSubmit={this.handleSubmit.bind(this)} method="POST">
                        <Button type="submit" value="Submit" style={{ width: '21%' }} variant="contained" color="primary">Result</Button>
                    </form>
                </Grid>
                <Grid item xs={6} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'left'
                }}>
                    <Header size = 'huge'>
                        Result:
                    </Header>
                </Grid>
            </Grid>
        </div>
        );
    }
};