import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';

export const MiniNavBar = _ => {

  let history = useHistory();
  const pushLink = link => {
    history.push(link);
  }
  
  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={4} md={4} xl={4} lg={4} style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <Button
              variant="contained"
              color="primary"
              onClick={()=>{pushLink('/log-reg')}}
          >
              About
          </Button>
        </Grid>
        <Grid item xs={4} md={4} xl={4} lg={4} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
          <Button
              variant="contained"
              color="primary"
              onClick={()=>{pushLink('/log-reg/train')}}
              >
              Train
          </Button>
        </Grid>
        <Grid item xs={4} md={4} xl={4} lg={4} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
          <Button
              variant="contained"
              color="primary"
              onClick={()=>{pushLink('/log-reg/test')}}
              >
              Test
          </Button>
        </Grid>
      </Grid> 
    </div>      
  );
}
