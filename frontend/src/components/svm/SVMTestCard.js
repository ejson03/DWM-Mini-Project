import React from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from '@material-ui/core/styles';
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  pos: {
    marginBottom: 12,
  }
});

export default function OutlinedCard(props) {
  const classes = useStyles();
  
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
       <Typography className={classes.pos} color="textSecondary">
          {props.class}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {props.coef}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {props.intercept}
        </Typography>
      </CardContent>
    </Card>
  );
}
