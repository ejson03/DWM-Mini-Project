import React, { Component } from 'react'  
import axios from 'axios';  
import { Bar } from 'react-chartjs-2'; 
import { Header } from 'semantic-ui-react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { PROXY_URL } from '../misc/ProxyURL';
import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography";

export class BarChart extends Component {  
    constructor(props) {  
        super(props);  
        this.state = { Data: {} };
    }
    componentDidMount() {  
        axios.get(PROXY_URL + '/visualization/svm') 
            .then(res=> {
                console.log(res);
                const data = res.data;
                let labels = []
                let colors = []
                let record = []
                data.forEach(stuff =>{
                    labels.push(stuff.labels);
                    colors.push(stuff.colors);
                    record.push(stuff.record)
                });
                this.setState({
                    Data: {
                        labels: labels, 
                        datasets: [
                            {
                                label: 'Bar Visualization',
                                data: record,
                                backgroundColor: colors
                            }
                        ]
                    }
                });
            }) 
        }
    render(){
        return(
            <div>
                <Grid container spacing={0}>
                <Grid item xs={6} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'left'
                }}>
                    <Header size = 'huge'>
                        Insert Hyperparameters:
                    </Header>
                    <br />
                    <form onSubmit={this.handleSubmit.bind(this)} method="POST">
                        <Button type="submit" value="Submit" style={{ width: '21%' }} variant="contained" color="primary">Train</Button>
                        <br /><br />
                        <Typography variant={"h6"} gutterBottom>
                            <b>{this.state.uploadStatus}</b>
                        </Typography>
                        <br/><br />
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
                    </form>
                </Grid>
                </Grid>
                <Bar 
                    data={this.state.Data}
                    options={{ maintainAspectRatio: false }} />
            </div>
        )
    }  
}    

