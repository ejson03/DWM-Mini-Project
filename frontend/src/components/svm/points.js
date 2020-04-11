import React, {Component} from 'react';
import {List, Button, Icon} from 'semantic-ui-react';
import './points.css';

export class Points extends Component {
    constructor(props) {
        super(props);
        this.state = {
            points: this.props.points,
            toggle: this.props.toggle,
            deletePoint: this.props.deletePoint
        };
    };

    componentDidUpdate(prevProps) {
        if (prevProps.toggle !== this.props.toggle) {
            this.setState(this.props);
        }
    }

    render() {
        return (
            <div className="svm__points">
                <h2><u>Points</u>:</h2>
                <div className="svm__points-list">
                    <List>
                    {this.state.points.map((point, i) => {
                        return (
                            <List.Item key={i}>
                                <header className='point-row'>
                                    <span className='point-row__point'>
                                    {point.label === 1 ? 'Red' : 'Blue'}: 
                                    ({point.x}, {point.y})
                                    </span>
                                    <Button className='point-row__delete'
                                        onClick={_ => {
                                            this.state.deletePoint(i);
                                        }
                                    }>
                                        <Icon name='close' />
                                    </Button>
                                </header>
                            </List.Item>
                        );
                    })}
                    </List>
                </div>
            </div>
        );
    }
};