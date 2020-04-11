import React, {Component} from 'react';
import {Points} from './points'
import {AddPointForm} from './addPointForm';
import {SVMChart} from './svmChart';
import {SVMBackground} from './svmBackground';
import {SVMSlider} from './svmSlider';
import { Header } from 'semantic-ui-react';
import './svm.css';


export class SVM extends Component {
    constructor() {
        super();
        this.state = {
            points: [{x: 1, y: 2, label: 1}, {x: 2, y: 1, label: -1}, {x: 3, y: 4, label: 1}],
            c: 1,
            metadata: {
                boundaryLine: [{x: 0.0, y: 0.0}, {x: 4.0, y: 3.996}],
                upperLine: [{x: 0.0, y: 0.9995}, {x: 4.0, y: 4.9955}], 
                lowerLine: [{x: 0.0, y: -0.9995}, {x: 4.0, y: 2.9965}],
                colors: ['#000000', '#FF0000', '#0000FF'],
                accuracy: '100.00%'
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
                    Support Vector Machine
                </Header>
                <div className="svm">
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
                        c={this.state.c}
                    />
                    <Header className='svm__stats'
                            size='small'
                    >
                        SVM Accuracy: {this.state.metadata.accuracy}
                    </Header>
                    <SVMSlider 
                        c={this.state.c}
                        updateC={
                            newC => this.setState({
                                c: newC
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
                    <SVMChart 
                        points={this.state.points}
                        boundaryLine={this.state.metadata.boundaryLine}
                        upperLine={this.state.metadata.upperLine}
                        lowerLine={this.state.metadata.lowerLine}
                        colors={this.state.metadata.colors}
                    />
                </div>
                <hr></hr>
                <SVMBackground />
            </div>
        );
    }
};