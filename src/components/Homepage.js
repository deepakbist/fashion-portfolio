import React from 'react';

import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import {loadPortfolios} from '../actions';

import {Button,Box,Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    box:{
        textAlign: 'center',
    },
    button1:{
        width: theme.spacing(25),
        height: theme.spacing(6)
    },
    caption:{
        fontSize: '1.2em'
    },
    button2:{
        width: theme.spacing(25),
        height: theme.spacing(6),
        marginTop: '1em'
    }
  }));

export default ()=>{

    const classes = useStyles();
    const dispatch = useDispatch();
    React.useEffect(()=>{
        dispatch(loadPortfolios());
    },[])
    return(
        <div>
            <Box display="flex" className={classes.box} justifyContent="center" flexDirection="column" alignItems="center">
                <Typography variant="h3" gutterBottom>
                    Fashion Portfolio
                </Typography>
                <Typography className={classes.caption} variant="caption" display="block" gutterBottom>
                Fashion is the armor to survive the reality of everyday life.
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                Bill Cunningham
                </Typography>
            </Box>
            <Box mt="3em" display="flex" justifyContent="center" flexDirection="column" alignItems="center">
            <Link style={{textDecoration:'none'}} to="/create"><Button variant="contained" className={classes.button1} color="primary">Create portfolio</Button></Link>

            <Link style={{textDecoration:'none'}} to="/portfoliogrid"><Button className={classes.button2} variant="outlined">View portfolios</Button></Link>
            </Box>
           
        </div>
    )
}