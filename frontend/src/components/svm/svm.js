import React, {Component} from 'react';
import {SVMChart} from './svmChart';
import {SVMSlider} from './svmSlider';
import { Header } from 'semantic-ui-react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import {PROXY_URL} from '../misc/proxyURL';
import './svm.css';

const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    }
  }));
  
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
        this.upload = this.upload.bind(this);
    };

    upload(ev) {
        ev.preventDefault();
    
        const data = new FormData();
        data.append('file', this.uploadInput.files[0]);
    
        fetch(PROXY_URL + '/upload', {
          method: 'POST',
          body: data,
        });
    }

    TrainForm() {
        const classes = useStyles();
        const [penalty, setPenalty] = React.useState("");
    
        const handleChange = event => {
            setPenalty(event.target.value);
        };
    
        return (
            <div>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Penalty</InputLabel>
                    <Select
                        labelId="penalty-label"
                        id="penalty"
                        value={penalty}
                        onChange={handleChange}
                        label="Penalty"
                        required
                    >
                        <MenuItem default value={"l1"}>L1</MenuItem>
                        <MenuItem value={"l2"}>L2</MenuItem>
                    </Select>
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
                </FormControl>
            </div>
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
                    <this.TrainForm/>    
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