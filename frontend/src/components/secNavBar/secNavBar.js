import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
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
        <div>
          <Button style={{ width: '10%' }} color="inherit" onClick={()=>{pushLink('/')}}>Home</Button>
          <Button style={{ width: '10%' }} color="inherit" onClick={()=>{pushLink('/lin-reg')}}>Linear</Button>
          <Button style={{ width: '10%' }} color="inherit" onClick={()=>{pushLink('/k-means')}}>K-Means</Button>
          <Button style={{ width: '10%' }} color="inherit" onClick={()=>{pushLink('/svm')}}>SVM</Button>
          <Button style={{ width: '10%' }} color="inherit" onClick={()=>{pushLink('/lda')}}>LDA</Button>
        </div>
      </AppBar> 
    </div>      
  );
}
