import React, {Component} from 'react';
import {Form, Input, Dropdown, Button} from 'semantic-ui-react';
import {PROXY_URL} from '../misc/proxyURL';
import './addPointForm.css';

const options = [
    {
        key: '+1',
        text: 'Red',
        value: 1
    },
    {
        key: '-1',
        text: 'Blue',
        value: -1
    }
]

function validNumber(str) {
    let trimmed = str.trim();
    return trimmed.length > 0 && isFinite(trimmed);
};

export async function getMetadata(points, c) {
    const x = [];
    const y = [];
    const labels = [];
    points.map(point => {
        x.push(point.x);
        y.push(point.y);
        labels.push(point.label);
    });
    
    const response = await fetch(PROXY_URL + '/svm', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'x': x,
            'y': y,
            'labels': labels,
            'c': c
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
            label: null,
            xStatus: '',
            yStatus: '',
            onNewPoint: this.props.onNewPoint,
            updateMetadata: this.props.updateMetadata,
            points: this.props.points
        };
    };

    async componentDidUpdate(prevProps) {
        if (prevProps.points.length !== this.props.points.length
            || prevProps.c !== this.props.c) {
            this.setState({
                points: this.props.points
            });

            const promise = getMetadata(this.props.points, this.props.c);
            promise.then(metadata => this.state.updateMetadata(metadata));
        }
    };

    render() {
        return (
            <div className='svm__form'>
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
                    <header className="xy-form__row">
                        <Form.Field>
                            <Dropdown   className='xy-form__label'
                                        placeholder='Label'
                                        fluid
                                        selection
                                        options={options}
                                        onChange={(_, data) => {
                                            this.setState({label: data.value});
                                        }}
                            />
                        </Form.Field>
                    </header>
                    <Button primary
                            className="add-point"
                            disabled={!(validNumber(this.state.x) && validNumber(this.state.y))}
                            onClick={async () => {
                                let newPoint = {
                                    x: Number(this.state.x), 
                                    y: Number(this.state.y),
                                    label: Number(this.state.label)
                                }
                                this.state.onNewPoint(newPoint);
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