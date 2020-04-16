import React, {Component} from 'react';
import { Header } from 'semantic-ui-react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {PROXY_URL} from '../misc/proxyURL';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import './kmeans.css';

export class KMeans extends Component {
    constructor(props) {
        super(props);
        this.state = {
            kvalue: 2,
            k: 2,
        };
    };

    handleSubmit(e){
        e.preventDefault();
        console.log(this.state.kvalue);
        
        axios({
          method: "POST",
          url:PROXY_URL + '/train/kmeans', 
          data: [this.state.k]
        }).then((response)=>{
          console.log(response);
        })
      }
    
    onKValueChange(event) {
        this.setState({kvalue: event.target.value})
    }

    render() {
        return (
            <div>
                
                <Header className='title'
                        size='huge'
                >
                    K-Means
                </Header>
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
                                    id="k"
                                    label="K (Value >= 2)"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    defaultValue={'2'}
                                    required
                                    value={this.state.kvalue}
                                    onChange={this.onKValueChange.bind(this)}
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
                        
                    </Grid>
                    <Grid item xs={3} style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-end'
                    }}>
                        <Button style={{ width: '40%' }} variant="contained" color="primary" >
                            Test 
                        </Button>
                        <br/>
                        <Button style={{ width: '40%' }} variant="contained" color="primary" >
                            Result
                        </Button>
                    </Grid>
                </Grid>
            </div>
        );
    }
};