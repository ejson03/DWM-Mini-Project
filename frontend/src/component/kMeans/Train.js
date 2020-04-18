import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { PROXY_URL } from '../misc/ProxyURL';
import TextField from '@material-ui/core/TextField';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { MiniNavBar } from './NavBar';
import axios from 'axios';

export class KMeansTrain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            k: 2,
            result: [],
            uploadStatus: '',
            showResult: false
        };
        this.createResult = this.createResult.bind(this);
    };

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state.k);

        axios({
            method: "POST",
            url: PROXY_URL + "/train/kmeans",
            data: [this.state.k]
        }).then((res) => {
            if(res.status === 200){
                let uploadStatus = 'Success!';
                console.log(uploadStatus)
                this.setState({ uploadStatus });
                console.log(res)
                this.setState({ result: res.data });
            }else{
                let uploadStatus = 'Something Went Wrong!';
                console.log(uploadStatus)
                this.setState({ uploadStatus });
            }
        }).catch((error) => {
            let uploadStatus = error.toString( );
            console.log(uploadStatus)
            this.setState({ uploadStatus });
          });
    }

    onKChange(event) {
        this.setState({ k: event.target.value })
    }

    createResult() {
        this.setState({ showResult: true }) 
    }

    render() {
        return (
            <div>
                <MiniNavBar />
                <br /><br />
                <Header size='huge'>
                    K-Means Clustering:
                </Header>
                <br /><br />
                <Grid container spacing={0}>
                <Grid item xs={6} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'left'
                }}>
                    <Header size = 'huge'>
                        Insert Hyperparameters:
                    </Header>
                    <br />
                    <form onSubmit={this.handleSubmit.bind(this)} method="POST">
                        <Button type="submit" value="Submit" style={{ width: '21%' }} variant="contained" color="primary">Train</Button>
                        <br /><br />
                        <Typography variant={"h6"} gutterBottom>
                            <b>{this.state.uploadStatus}</b>
                        </Typography>
                        <br/><br />
                        <div>
                            <TextField
                                id="k"
                                label="K (Value >= 2)"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                defaultValue={'2'}
                                required
                                value={this.state.k}
                                onChange={this.onKChange.bind(this)}
                            />
                        </div>
                    </form>
                </Grid>
                <Grid item xs={6} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'left'
                }}>
                    <Header size = 'huge'>
                        Result:
                    </Header>
                    <br />
                    <Button style={{ width: '21%' }} variant="contained" color="primary" onClick={this.createResult}>Result</Button>
                    <br /><br /><br />
                    {this.state.showResult &&
                        <Card
                            style={{
                                width: "95%",
                                margin: '2.5%',
                                transition: "0.3s",
                                boxShadow: "0 12px 40px -12px rgba(0,0,0,0.3)",
                                "&:hover": {
                                boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
                                }
                            }}
                            >
                            <CardContent>
                                <Typography id="coef" variant={"h6"}>
                                    <b>Coef: </b>{this.state.result.coef}
                                </Typography>
                                <Typography id="intercept" variant={"h6"}>
                                    <b>Intercept: </b>{this.state.result.intercept}
                                </Typography>
                            </CardContent>
                        </Card>
                    }
                    <Card
                        style={{
                            width: "95%",
                            margin: '2.5%',
                            transition: "0.3s",
                            boxShadow: "0 12px 40px -12px rgba(0,0,0,0.3)",
                            "&:hover": {
                            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
                            }
                        }}
                        >
                        <CardContent>
                            <Typography variant={"h6"} gutterBottom>
                                <b>Centers: </b>{this.state.result.centers}
                            </Typography>
                            <Typography variant={"h6"}>
                                <b>Labels: </b>{this.state.result.labels}
                            </Typography>
                            <Typography variant={"h6"}>
                                <b>Preds: </b>{this.state.result.preds}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
        );
    }
};