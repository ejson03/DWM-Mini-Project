import React, { Component } from 'react'  
import axios from 'axios';  
import { Line } from 'react-chartjs-2'; 
import { Header } from 'semantic-ui-react';
import Button from '@material-ui/core/Button';
import { PROXY_URL } from '../misc/ProxyURL';
import {lineOptions, styles, dataset, style} from './LineConfig';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export class LineChart extends Component {  
    constructor(props) {  
        super(props);  
        this.state = { 
            Data: {},
            data: this.props.data || {},
            columns: this.props.columns || [],
            record: '' ,
            label: '' 
        };
    }
    handleSubmit(e) {  
        e.preventDefault();
        axios({
            method: "POST",
            url: PROXY_URL + "/visualization",
            data: [this.state.data, this.state.record, this.state.label]
        })
            .then(res=> {
                let labels = res.data.labels;
                let record = res.data.record;
                let colors = res.data.colors;
                let data = []
                for (let index in labels){
                    console.log(labels[index], colors[index]);
                    let inter = {...dataset, label:labels[index],
                    data:record[labels[index]], borderColor: colors[index]};
                    data.push(inter);
                }
                this.setState({
                    Data: {
                        labels: labels, 
                        datasets: data
                    }
                });
            }) 
        }
        onRecord(event) {
            this.setState({ record: event.target.value })
        }
        onLabel(event) {
            this.setState({ label: event.target.value })
        }
    render(){
        return(
                <div>
                        <MuiThemeProvider>
                            <div>
                <div>
                    <Header size = 'huge'>
                        Insert Column Number To View:
                    </Header>
               
                        <br />
                        <form  onSubmit={this.handleSubmit.bind(this)} method="POST">
                            <br /><br /> 
                           <div>
                                <select style={style} value={this.state.record} onChange={this.onRecord.bind(this)}>
                                {
                                    this.state.columns.map(index =>
                                        <option value={index} key={index}>{index}</option>
                                )}
                                </select>
                                <select style={style} value={this.state.label} onChange={this.onLabel.bind(this)}>
                                {
                                    this.state.columns.map(index =>
                                        <option value={index} key={index}>{index}</option>
                                )}
                                </select>
                               
                                <Button type="submit" value="Submit" style={{ width: '10%' }} variant="contained" color="primary">View</Button>
                           </div> 
                        </form>
                 
                </div>
                <br /><br /><br /><br />
                <div style={styles}>
                    <Line
                        width={100}
                        height={25}
                        data={this.state.Data}
                        options={lineOptions} />
                </div>
                </div>
                </MuiThemeProvider>

        </div>
        )
}      

}