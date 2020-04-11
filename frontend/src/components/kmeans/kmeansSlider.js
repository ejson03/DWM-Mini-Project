import React, {Component} from 'react';
import {Form} from 'semantic-ui-react';


export class KMeansSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            k: this.props.k
        }
    };

    render() {
        return (
            <div className='kmeans__slider'>
                <Form>
                    <Form.Input 
                        label={'Number of Clusters: ' + this.state.k}
                        min={1}
                        max={this.props.maxColors}
                        name='k'
                        onChange={e => {
                            this.setState({ k: e.target.value });
                            this.props.updateK(e.target.value);
                        }}
                        step={1}
                        type='range'
                        value={this.state.k}
                    />
                </Form>
            </div>
        );
    }
};