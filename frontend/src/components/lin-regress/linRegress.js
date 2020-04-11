import React, {Component} from 'react';
import {Points} from './points'
import {AddPointForm} from './addPointForm';
import {LinRegressChart} from './linRegressChart';
import {LinRegressBackground} from './linRegressBackground';
import { Header } from 'semantic-ui-react';
import './linRegress.css';


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
                <div className="lin-regress">
                    <AddPointForm 
                        points={this.state.points}
                        onNewPoint={
                            point => this.setState({
                                points: [...this.state.points, point]
                            })
                        }
                        updateMetadata={
                            newMetadata => this.setState({
                                metadata: newMetadata,
                                toggle: (this.state.toggle + 1) % 2
                            })
                        }
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
                    <LinRegressChart
                        points={this.state.points}
                        bestFitLine={this.state.metadata.bestFitLine}
                    />
                    <Header className='lin-regress__stats'
                            size='small'
                    >
                        Slope of Line: {this.state.metadata.m}
                        <br />
                        Intercept: {this.state.metadata.b}
                        <br />
                        Total Residual: {this.state.metadata.residual}
                    </Header>
                </div>
                <hr></hr>
                <LinRegressBackground />
            </div>
        );
    }
};