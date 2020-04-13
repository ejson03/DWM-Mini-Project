import React, {Component} from 'react';
import { Header } from 'semantic-ui-react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {PROXY_URL} from '../misc/proxyURL';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
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
            k: '2'
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleSubmit(e){
        e.preventDefault();
        console.log(this.state.k);
        
        axios({
          method: "POST",
          url:PROXY_URL + '/train/kmeans', 
          data:  [this.state.k]
        }).then((response)=>{
          console.log(response);
        })
      }
    
    onKChange(event) {
        this.setState({k: event.target.value})
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
                        <form onSubmit={this.handleSubmit.bind(this)} method="POST">
                            <div>
                                <TextField
                                    id="k"
                                    label="K (Value >= 2)"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    defaultValue={'2'}
                                    required
                                    value={this.state.k}
                                    onChange={this.onKChange.bind(this)}
                                />
                            </div>
                            <br /><br />
                            <Button type="submit" value="Submit" variant="contained" color="primary">Train</Button>
                            <br /><br />
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