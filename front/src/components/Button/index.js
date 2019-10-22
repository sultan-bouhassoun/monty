import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  button: {
    margin: 'auto',
    display: 'block',
  }
}));

export default function UIButton(props){
    const classes = useStyles();
    const variant = props.variant || "contained";
    const color = props.color || "primary";
    const size = props.size || "medium";
    return(
        <div>
            <Button variant={variant} color={color} size={size} className={classes.button} type={props.type} onClick={props.onClick}>
                {props.text}
            </Button>
        </div>
    )
}