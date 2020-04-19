import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import { PROXY_URL } from '../misc/ProxyURL';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { MiniNavBar } from './NavBar';
import axios from 'axios';

export class LinRegTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: [],
            uploadStatus: '',
            showResult: false
        };
        this.createResult = this.createResult.bind(this);
    };

    handleSubmit(e) {
        e.preventDefault();
        
        axios.get(PROXY_URL + '/test/linreg')
            .then((res) => {
                if(res.status === 200){
                    let uploadStatus = 'Success!';
                    console.log(uploadStatus)
                    this.setState({ uploadStatus });
                    console.log(res)
                    this.setState({ result: res.data });
                }else{
                    let uploadStatus = '😱 Something Went Wrong!';
                    console.log(uploadStatus)
                    this.setState({ uploadStatus });
                }
            }).catch((error) => {
                let uploadStatus = error.toString( );
                uploadStatus = uploadStatus + ' 😱';
                console.log(uploadStatus)
                this.setState({ uploadStatus });
            });
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
                    Linear Regression:
                </Header>
                <br /><br />
                <Grid container spacing={0}>
                <Grid item xs={6} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'left'
                }}>
                    <Header size = 'huge'>
                        Test:
                    </Header>
                    <br />
                    <form onSubmit={this.handleSubmit.bind(this)} method="GET">
                        <Button type="submit" value="Submit" style={{ width: '21%' }} variant="contained" color="primary">Test</Button>
                    </form>
                    <br/>
                    <Typography variant={"h6"} gutterBottom>
                        <b>{this.state.uploadStatus}</b>
                    </Typography>
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
                                <Typography variant={"h6"}>
                                    <b>MAE: </b>{this.state.result.mae}
                                    <br />
                                    <b>MSE: </b>{this.state.result.mse}
                                    <br />
                                    <b>RMSE: </b>{this.state.result.rmse}
                                </Typography>
                            </CardContent>
                        </Card>
                    }
                </Grid>
            </Grid>
        </div>
        );
    }
};