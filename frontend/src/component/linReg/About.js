import React, { Component } from 'react';
import YouTube from 'react-youtube';
import { Header } from 'semantic-ui-react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { PROXY_URL } from '../misc/ProxyURL';
import { MiniNavBar } from './NavBar';

export class LinRegAbout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploadStatus: ''
        };
        this.uploadFile = this.uploadFile.bind(this);
    }
    
    uploadFile(ev) {
        ev.preventDefault();

        const data = new FormData();
        data.append('file', this.uploadInput.files[0]);

        fetch(PROXY_URL + '/uploads/linreg', {
            method: 'POST',
            body: data,
        }).then(res => {
            if(res.status === 200){
                let uploadStatus = 'Success!';
                console.log(uploadStatus)
                this.setState({ uploadStatus });
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

    render() {
        return (
            <div>
                <MiniNavBar />
                <br /><br />
                <Header size='huge'>
                    Linear Regression:
                </Header>
                <Header size='huge'>
                    Upload the dataset (in .csv, .json or .yaml format) on which you would like to perform Linear Regression on: 
                </Header>
                <br/>
                <form onSubmit = { this.uploadFile }>
                    <div>
                        <input
                            accept = ".csv, .json, .yml"
                            single ref = {
                                (ref) => { this.uploadInput = ref; }
                            }
                            type = "file"
                        />
                    </div>
                    <br />
                    <div>
                        <Button
                            type = "submit"
                            value = "Submit"
                            variant = "contained"
                            color = "primary"
                            style={{ width: '10%' }}
                        >
                            Upload
                        </Button>
                    </div>
                </form>
                <br />
                <Typography variant={"h6"} gutterBottom>
                    <b>{this.state.uploadStatus}</b>
                </Typography>
                <Header size='huge'>
                    Linear Regression Background/Explanation:
                </Header>
                <br />
                <YouTube
                    videoId="CtKeHnfK5uA"
                    opts={{
                        height: '390',
                        width: '694',
                        playerVars: { // https://developers.google.com/youtube/player_parameters
                            autoplay: false
                        }
                    }}
                />
                <br />
            </div>
        );
    }
};