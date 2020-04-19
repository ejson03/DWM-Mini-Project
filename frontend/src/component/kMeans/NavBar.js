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
        <Grid item xs={6} md={6} xl={6} lg={6} style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <Button
              variant="contained"
              color="primary"
              onClick={()=>{pushLink('/k-means')}}
          >
              About
          </Button>
        </Grid>
        <Grid item xs={6} md={6} xl={6} lg={6} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
          <Button
              variant="contained"
              color="primary"
              onClick={()=>{pushLink('/k-means/train')}}
              >
              Train
          </Button>
        </Grid>
      </Grid> 
    </div>      
  );
}
