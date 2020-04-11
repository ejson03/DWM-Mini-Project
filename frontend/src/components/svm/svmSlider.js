import React, {Component} from 'react';
import {Form} from 'semantic-ui-react';


export class SVMSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            c: this.props.c
        }
    };

    render() {
        return (
            <div className='svm__slider'>
                <Form>
                    <Form.Input 
                        label={'Value of C: ' + this.state.c}
                        min={0.01}
                        max={1}
                        name='c'
                        onChange={e => {
                            this.setState({ c: e.target.value });
                            this.props.updateC(e.target.value);
                        }}
                        step={0.001}
                        type='range'
                        value={this.state.c}
                    />
                </Form>
            </div>
        );
    }
};