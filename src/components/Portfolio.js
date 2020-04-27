import React from 'react';
import { Box, Typography,Button, Divider,Grid } from '@material-ui/core';

import { useSelector,useDispatch } from "react-redux";
import { Link } from "react-router-dom";


export default ()=>{
    const currentUser = useSelector(state => state.currentUser);
    const dispatch = useDispatch();
    const [status,setStatus] = React.useState('images');
    const imageGrid = <Grid container spacing={2}>
        {
            currentUser.images.map((image,index)=>(
                <Grid key={index} item xs={12} md={6}>
                    <Box display="flex" justifyContent="center" padding="1em">
                        <img style={{maxWidth:'35vw',maxHeight:'80vh'}} src={image.url} alt="img" />
                    </Box>  
                </Grid>
            ))
        }
    </Grid>
    return(
        <Box padding="1em">
            <Box display="flex" justifyContent="center">
                <Typography variant="h5" style={{fontFamily:'Cormorant Garamond'}} gutterBottom>
                    {currentUser.firstName + ' ' + currentUser.lastName}
                </Typography>
            </Box>
            <Box mt="1em" display="flex" justifyContent="center">
                <Button onClick={()=>{setStatus('images')}}>
                    Portfolio Images
                </Button>
                <Button onClick={()=>{setStatus('about')}}>
                    About
                </Button>
                <Link to="/edit"><Button>Edit</Button></Link>
            </Box>
            <Divider />
            <Box mt="1em">
                {status === 'images' &&
                    <>
                    {imageGrid}
                    </>
                }
                {status === 'about' && 
                    <>
                     <Grid container spacing={2} style={{background:'#000',color:'#fff'}}>
                         <Grid item xs={6}>
                            <img style={{width:'100%'}} src={currentUser.images[0].url} alt="img" />
                         </Grid>
                         <Grid item xs={6}>
                             <Box style={{textAlign:'center',}}>
                                 <Typography variant="h5" style={{fontFamily:'Cormorant Garamond'}} gutterBottom>
                                     About Me
                                 </Typography>
                                 <Typography variant="subtitle2">
                                    Follower of the highness dreams with a hardworking, positive attitude. Hello my name is {currentUser.firstName + ' ' + currentUser.lastName} and I can say that I am a very motivated and strong individual from the inside out
                                 </Typography>
                                 <Box mt="1em">
                                    <Typography variant="body" style={{fontFamily:'Cormorant Garamond'}} gutterBottom>
                                        Modal Measurement
                                    </Typography>
                                </Box>
                                <Box mt="1em">
                                    <Typography variant="subtitle2">
                                        Height: {currentUser.height} cm
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        Weight: {currentUser.weight} kg
                                    </Typography>
                                </Box>
                                <Box mt="1em">
                                    <Typography variant="body" style={{fontFamily:'Cormorant Garamond'}} gutterBottom>
                                        Contact Details
                                    </Typography>
                                </Box>
                                <Box mt="1em">
                                    <Typography variant="subtitle2">
                                        Email: {currentUser.email}
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        Phone: {currentUser.mobile}
                                    </Typography>
                                </Box>
                                
                             </Box>
                         </Grid>
                     </Grid>
                    </>
                }
            </Box>

        </Box>
    )
}