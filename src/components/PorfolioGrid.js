import React from 'react';
import { Box, Typography,Button, Divider,Grid } from '@material-ui/core';

import { useSelector,useDispatch } from "react-redux";
import {updateCurrent} from '../actions';

import { Link,useHistory } from "react-router-dom";


export default ()=>{
    const allPortfolios = useSelector(state => state.allPortfolios);
    const dispatch = useDispatch();
    const history = useHistory();
    
    const openPortfolio = (payload)=>{
        dispatch(updateCurrent(payload.data));
        history.push('/portfolio');
    }

    const porfolioGrid = <Grid container spacing={2}>
        {
            allPortfolios.map(portfolio=>(
                <Grid key={portfolio.id} item xs={6} md={4}>
                    <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center" padding="1em">
                        <img style={{maxWidth:'20vw',maxHeight:'40vh'}} src={portfolio.data.images[0].url} alt="img" />
                        <Typography variant="subtitle2">
                            {portfolio.data.firstName +' ' + portfolio.data.lastName}
                        </Typography>
                        <Button onClick={()=>{openPortfolio(portfolio)}}>Open</Button>
                    </Box> 
                </Grid>
            ))
        }
    </Grid>
    return(
        <Box padding="1em">
            <Box display="flex" justifyContent="center">
                <Typography variant="h5" style={{fontFamily:'Cormorant Garamond'}} gutterBottom>
                    All Porfolios
                </Typography>
            </Box>
            <Box mt="1em" display="flex" justifyContent="center">
            </Box>
            <Divider />
            {porfolioGrid}


        </Box>
    )
}