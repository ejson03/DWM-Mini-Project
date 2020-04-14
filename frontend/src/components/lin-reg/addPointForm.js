import React, {Component} from 'react';
import {Form, Input, Button} from 'semantic-ui-react';
import {PROXY_URL} from '../misc/proxyURL';
import './addPointForm.css';

function validNumber(str) {
    let trimmed = str.trim();
    return trimmed.length > 0 && isFinite(trimmed);
};

async function getMetadata(points) {
    const x = [];
    const y = [];
    points.map(point => {
        x.push(point.x);
        y.push(point.y);
    });
    
    const response = await fetch(PROXY_URL + '/lin_regress', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'x': x,
            'y': y
        })
    });

    const metadata = await response.json();
    return metadata;
}

export class AddPointForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            x: '',
            y: '',
            xStatus: '',
            yStatus: '',
            onNewPoint: this.props.onNewPoint,
            updateMetadata: this.props.updateMetadata,
            points: this.props.points
        };
    };

    async componentDidUpdate(prevProps) {
        if (prevProps.points.length !== this.props.points.length) {
            this.setState({
                points: this.props.points
            });

            const promise = getMetadata(this.props.points);
            promise.then(metadata => this.state.updateMetadata(metadata));
        }
    };

    render() {
        return (
            <div className='lin-regress__form'>
                <h2><u>Input Point</u>:</h2>
                <Form className='xy-form'>
                    <header className="xy-form__row">
                        <Form.Field>
                            <Input  className="xy-form__row__input"
                                    placeholder='X-Coordinate'
                                    value={this.state.x}
                                    onChange={e => {
                                        this.setState({x: e.target.value});
                                        if (validNumber(e.target.value) || e.target.value.length === 0)
                                            this.setState({xStatus: ''});
                                        else
                                            this.setState({xStatus: 'Not a number!'});
                                    }}
                            />
                            <span className='xy-form__row__span'>{this.state.xStatus}</span>
                        </Form.Field>
                    </header>
                    <header className="xy-form__row">
                        <Form.Field>
                            <Input  className="xy-form__row__input"
                                    placeholder='Y-Coordinate'
                                    value={this.state.y}
                                    onChange={e => {
                                        this.setState({y: e.target.value});
                                        if (validNumber(e.target.value) || e.target.value.length === 0)
                                            this.setState({yStatus: ''});
                                        else
                                            this.setState({yStatus: 'Not a number!'});
                                    }}
                            />
                            <span className="xy-form__row__span">{this.state.yStatus}</span>
                        </Form.Field>
                    </header>
                    <Button primary
                            className="add-point"
                            disabled={!(validNumber(this.state.x) && validNumber(this.state.y))}
                            onClick={async () => {
                                this.state.onNewPoint({x: Number(this.state.x), y: Number(this.state.y)});
                                this.setState({
                                    x: '',
                                    y: '',
                                    xStatus: '',
                                    yStatus: ''
                                });
                            }
                    }>
                        Add Point
                    </Button>
                </Form>
            </div>
        );
    }
};