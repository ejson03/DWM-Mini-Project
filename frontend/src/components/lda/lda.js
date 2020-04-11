import React, {Component} from 'react';
import {Gaussians} from './gaussians'
import {AddGaussianForm} from './addGaussianForm';
import {LDAChart} from './ldaChart';
import {LDABackground} from './ldaBackground';
import { Header } from 'semantic-ui-react';
import './lda.css';


export class LDA extends Component {
    constructor() {
        super();
        this.state = {
            means: [],
            covarianceMatrices: [],
            metadata: {
                points: [],
                line: []
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
                    Linear Discriminant Analysis
                </Header>
                <div className="lda">
                    <AddGaussianForm 
                        means={this.state.means}
                        covarianceMatrices={this.state.covarianceMatrices}
                        onNewInput={
                            (meanVector, covMat) => this.setState({
                                means: [...this.state.means, meanVector],
                                covarianceMatrices: [...this.state.covarianceMatrices, covMat]
                            })
                        }
                        updateMetadata={
                            newMetadata => this.setState({
                                metadata: newMetadata,
                                toggle: (this.state.toggle + 1) % 2
                            })
                        }
                    />
                    <Gaussians 
                        means={this.state.means}
                        covMats={this.state.covarianceMatrices}
                        toggle={this.state.toggle}
                        deletePair={
                            i => this.setState({
                                    means: this.state.means.filter((_, idx) => i !== idx),
                                    covarianceMatrices: this.state.covarianceMatrices.filter((_, idx) => i !== idx),
                                    toggle: (this.state.toggle + 1) % 2
                                })
                        }
                    />
                    <LDAChart 
                        points={this.state.metadata.points}
                        line={this.state.metadata.line}
                    />
                </div>
                <hr></hr>
                <LDABackground />
            </div>
        );
    }
};