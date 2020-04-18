import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center"
  },
}));

export const NavBar = _ => {
  const classes = useStyles();
  let history = useHistory();
  const pushLink = link => {
    history.push(link);
  }
  
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
            Machine Learning
          </Typography>
        </Toolbar>
        <div>
          <Button style={{ width: '14.25%' }} color="inherit" onClick={()=>{pushLink('/')}}>Home</Button>
          <Button style={{ width: '14.25%' }} color="inherit" onClick={()=>{pushLink('/dataset')}}>Dataset</Button>
          <Button style={{ width: '14.25%' }} color="inherit" onClick={()=>{pushLink('/lin-reg')}}>Linear Regression</Button>
          <Button style={{ width: '14.25%' }} color="inherit" onClick={()=>{pushLink('/log-reg')}}>Logistic Regression</Button>
          <Button style={{ width: '14.25%' }} color="inherit" onClick={()=>{pushLink('/svm')}}>Support Vector Machine</Button>
          <Button style={{ width: '14.25%' }} color="inherit" onClick={()=>{pushLink('/nb')}}>Naive Bayes</Button>
          <Button style={{ width: '14.25%' }} color="inherit" onClick={()=>{pushLink('/k-means')}}>K-Means Clustering</Button>
        </div>
      </AppBar> 
    </div>      
  );
}
