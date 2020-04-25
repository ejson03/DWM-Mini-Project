import React, { Component } from 'react'  
import axios from 'axios';  
import { Doughnut } from 'react-chartjs-2'; 
import { PROXY_URL } from '../misc/ProxyURL';

export class DoughnutChart extends Component {  
    constructor(props) {  
        super(props);  
        this.state = { Data: {} };
    }
    componentDidMount() {  
        axios.get(PROXY_URL + '/visualization/line') 
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
                <Doughnut data={this.state.Data}
                options={{ maintainAspectRatio: false }} />
            </div>
        )
}      
}


