import React, { Component } from 'react'  
import axios from 'axios';  
import { Bar } from 'react-chartjs-2'; 
import { Header } from 'semantic-ui-react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { PROXY_URL } from '../misc/ProxyURL';
import TextField from '@material-ui/core/TextField';

export class BarChart extends Component {  
    constructor(props) {  
        super(props);  
        this.state = { 
            Data: {},
            data: this.props.data ,
            col: '' ,
            output: '' 
        };
    }
    handleSubmit(e) {  
        e.preventDefault();
        axios({
            method: "POST",
            url: PROXY_URL + "/visualization",
            data: [this.state.col , this.state.data, this.state.output]
        })
            .then(res=> {
                console.log(res);
                let labels = res.data.labels;
                let record = res.data.record;
                let colors = res.data.colors;
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
        onCol(event) {
            this.setState({ col: event.target.value })
        }
        onOutput(event) {
            this.setState({ output: event.target.value })
        }

        
    render(){
        return(
            <div>
                <br /><br />
                <div>
                <Grid container spacing={0}>
                <Grid item xs={6} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'left'
                }}>
                    <Header size = 'huge'>
                        Insert Column Number To View:
                    </Header>
                    <br />
                    <form autoComplete="off" onSubmit={this.handleSubmit.bind(this)} method="POST">
                        <br /><br /> 
                        <div> 
                            <TextField 
                                label="row"
                                type="string"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                required
                                value={this.state.col}
                                onChange={this.onCol.bind(this)}
                            />
                            <TextField 
                                label="row"
                                type="string"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                
                                variant="outlined"
                                required
                                value={this.state.output}
                                onChange={this.onOutput.bind(this)}
                            />
                            <Button type="submit" value="Submit" style={{ width: '21%' }} variant="contained" color="primary">View</Button>
                        </div>
                        
                    </form>
                </Grid>
                </Grid>
                </div>
                <br /><br /><br /><br />
                <div>
                    <Bar 
                        data={this.state.Data}
                        options={{ maintainAspectRatio: false }} />
                </div>
            </div>
        )
    }  
}    

