import React, {Component} from 'react';
import {SVMChart} from './svmChart';
import {SVMSlider} from './svmSlider';
import { Header } from 'semantic-ui-react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import TextField from "@material-ui/core/TextField";
import {PROXY_URL} from '../misc/proxyURL';
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
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleSubmit(event) {
        event.preventDefault();
        
        const data = new FormData(event.target);
        
        fetch(PROXY_URL + '/train/svm', {
          method: 'POST',
          body: data,
        });
    }

    Penalty() {
        const [value, setValue] = React.useState('female');
      
        const handleChange = (event) => {
          setValue(event.target.value);
        };
        
        return (
          <FormControl component="fieldset">
            <FormLabel component="legend">Penalty</FormLabel>
            <RadioGroup aria-label="Penalty" name="Penalty" value={value} onChange={handleChange}>
              <FormControlLabel value="l1" control={<Radio />} label="L1" />
              <FormControlLabel value="l2" control={<Radio />} label="L2" />
            </RadioGroup>
          </FormControl>
        );
      }

    render() {
        return (
            <div>
                <Header className='title'
                        size='huge'>
                    Support Vector Machine
                </Header> 
                <Grid style={{ marginTop: '500px' }} container spacing={0}>
                <Grid item xs={3} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'left'
                }}>
                    <this.Penalty/>
                    <br />
                    <TextField
                        id="test-split"
                        label="Test Split"
                        type="number"
                        defaultValue="0.2"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        required
                    />
                    <br />
                    <TextField
                        id="C"
                        label="C"
                        type="number"
                        defaultValue="1"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        required
                    />
                    <br />
                    <Button type="submit" variant="contained" color="primary" align="auto">Train</Button>   
                </Grid>
                <Grid item xs={3} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <Button type="submit" variant="contained" color="primary" >Test</Button>
                
                </Grid>
                <Grid item xs={3} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end'
                }}>
                    <Button type="sublit"  variant="contained" color="primary" >
                        Result
                    </Button>
                </Grid>
            </Grid>
        </div>
        );
    }
};