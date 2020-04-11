import React, {Component} from 'react';
import {Form, Input, Button} from 'semantic-ui-react';
import {PROXY_URL} from '../misc/proxyURL';
import {InlineMath} from 'react-katex';
import './addGaussianForm.css';

function validNumber(str) {
    let trimmed = str.trim();
    return trimmed.length > 0 && isFinite(trimmed);
};

export async function getMetadata(means, covarianceMatrices) {
    const response = await fetch(PROXY_URL + '/lda', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'means': means,
            'covarianceMatrices': covarianceMatrices
        })
    });

    const metadata = await response.json();
    return metadata;
}

export class AddGaussianForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            x: {value: '', status: ''}, 
            y: {value: '', status: ''},
            varX: {value: '', status: ''},
            varY: {value: '', status: ''},
            covXY: {value: '', status: ''},
            onNewInput: this.props.onNewInput,
            updateMetadata: this.props.updateMetadata,
            means: this.props.means,
            covarianceMatrices: this.props.covarianceMatrices
        };
    };

    async componentDidUpdate(prevProps) {
        if (prevProps.means.length !== this.props.means.length) {
            this.setState({
                means: this.props.means,
                covarianceMatrices: this.props.covarianceMatrices
            });

            const promise = getMetadata(this.props.means, this.props.covarianceMatrices);
            promise.then(metadata => this.state.updateMetadata(metadata));
        }
    };

    render() {
        return (
            <div className='lda__form'>
                <h2><u>Input Gaussian Class</u>:</h2>
                <Form>
                    <header className="lda-form__row">
                        <span class='lda-form__row__sym'>
                            <InlineMath math='\mu_X' />:
                        </span>
                        <Input  className="lda-form__row__input"
                                value={this.state.x.value}
                                onChange={e => {
                                    let newX = {value: e.target.value, status: ''};
                                    if (validNumber(e.target.value) || e.target.value.length === 0)
                                        newX.status = '';
                                    else
                                        newX.status = 'Not a number!';
                                    this.setState({x: newX});
                                }}
                        />
                        <span className='lda-form__row__span'>{this.state.x.status}</span>
                    </header>
                    <header className="lda-form__row">
                        <span class='lda-form__row__sym'>
                            <InlineMath math='\mu_Y' />:
                        </span>
                        <Input  className="lda-form__row__input"
                                value={this.state.y.value}
                                onChange={e => {
                                    let newY = {value: e.target.value, status: ''};
                                    if (validNumber(e.target.value) || e.target.value.length === 0)
                                        newY.status = '';
                                    else
                                        newY.status = 'Not a number!';
                                    this.setState({y: newY});
                                }}
                        />
                        <span className="lda-form__row__span">{this.state.y.status}</span>
                    </header>
                    <header className="lda-form__row">
                        <span class='lda-form__row__sym'>
                            <InlineMath math='\sigma_X^2' />:
                        </span>
                        <Input  className="lda-form__row__input"
                                value={this.state.varX.value}
                                onChange={e => {
                                    let newVarX = {value: e.target.value, status: ''};
                                    if (e.target.value.length === 0)
                                        newVarX.status = '';
                                    else if (!validNumber(e.target.value))
                                        newVarX.status = 'Not a number!';
                                    else if (validNumber(e.target.value) && e.target.value < 0)
                                        newVarX.status = 'Variance is non-negative!';
                                    else
                                        newVarX.status = '';
                                    this.setState({varX: newVarX});
                                }}
                        />
                        <span className="lda-form__row__span">{this.state.varX.status}</span>
                    </header>
                    <header className="lda-form__row">
                        <span class='lda-form__row__sym'>
                            <InlineMath math='\sigma_Y^2' />:
                        </span>
                        <Input  className="lda-form__row__input"
                                value={this.state.varY.value}
                                onChange={e => {
                                    let newVarY = {value: e.target.value, status: ''};
                                    if (e.target.value.length === 0)
                                        newVarY.status = '';
                                    else if (!validNumber(e.target.value))
                                        newVarY.status = 'Not a number!';
                                    else if (validNumber(e.target.value) && e.target.value < 0)
                                        newVarY.status = 'Variance is non-negative!';
                                    else
                                        newVarY.status = '';
                                    this.setState({varY: newVarY});
                                }}
                        />
                        <span className="lda-form__row__span">{this.state.varY.status}</span>
                    </header>
                    <header className="lda-form__row">
                        <span class='lda-form__row__sym'>
                            <InlineMath math='\sigma_{XY}' />:
                        </span>
                        <Input  className="lda-form__row__input"
                                value={this.state.covXY.value}
                                onChange={e => {
                                    let newCovXY = {value: e.target.value, status: ''};
                                    if (validNumber(e.target.value) || e.target.value.length === 0)
                                        newCovXY.status = '';
                                    else
                                        newCovXY.status = 'Not a number!';
                                    this.setState({covXY: newCovXY});
                                }}
                        />
                        <span className="lda-form__row__span">{this.state.covXY.status}</span>
                    </header>
                    <Button primary
                            className="add-point"
                            disabled={!(validNumber(this.state.x.value) && 
                                        validNumber(this.state.y.value) &&
                                        validNumber(this.state.varX.value) &&
                                        this.state.varX.value >= 0 &&
                                        validNumber(this.state.varY.value) &&
                                        this.state.varY.value >= 0 &&
                                        validNumber(this.state.covXY.value)
                                    )}
                            onClick={async () => {
                                let newMean = [
                                    Number(this.state.x.value), 
                                    Number(this.state.y.value)
                                ]
                                let newCovMat = [
                                    [this.state.varX.value, this.state.covXY.value],
                                    [this.state.covXY.value, this.state.varY.value]
                                ]
                                this.state.onNewInput(newMean, newCovMat);
                                this.setState({
                                    x: {value: '', status: ''},
                                    y: {value: '', status: ''},
                                    varX: {value: '', status: ''},
                                    varY: {value: '', status: ''},
                                    covXY: {value: '', status: ''}
                                });
                            }
                    }>
                        Add Gaussian Class
                    </Button>
                </Form>
            </div>
        );
    }
};