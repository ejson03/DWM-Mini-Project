import React, {Component} from 'react';
import { Header } from 'semantic-ui-react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {PROXY_URL} from '../misc/proxyURL';
import TextField from '@material-ui/core/TextField';
import {Points} from './points'
import {AddPointForm} from './addPointForm';
import {KMeansChart} from './kmeansChart';
import {KMeansSlider} from './kmeansSlider';
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
    constructor(props) {
        super(props);
        this.state = {
            kvalue: 2,
            k: 2,
            points: [{x: 1, y: 2, label: 0}, {x: 2, y: 1, label: 0}, {x: 3, y: 4, label: 0}],
            centroids: [{x: 2.0, y: 2.3333333333333335, label: 0}],
            toggle: 0
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
                <div className="kmeans">
                    <AddPointForm 
                        points={this.state.points}
                        onNewPoint={
                            point => this.setState({
                                points: [...this.state.points, point]
                            })
                        }
                        updateData={
                            outputData => this.setState({
                                centroids: outputData.centroids,
                                points: outputData.points,
                                toggle: (this.state.toggle + 1) % 2
                            })
                        }
                        k={this.state.k}
                    />
                    <KMeansSlider 
                        k={this.state.k}
                        updateK={
                            newK => this.setState({
                                k: newK
                            })
                        }
                        maxColors={colors.length}
                    />
                    <Points 
                        points={this.state.points}
                        toggle={this.state.toggle}
                        deletePoint={
                            i => this.setState({
                                    points: this.state.points.filter((_, idx) => i !== idx),
                                    toggle: (this.state.toggle + 1) % 2
                                })
                        }
                    />
                    <KMeansChart 
                        points={this.state.points}
                        centroids={this.state.centroids}
                        colors={colors}
                    />
                </div>
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