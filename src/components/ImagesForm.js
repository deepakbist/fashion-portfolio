import React from 'react';

import { v4 as uuidv4 } from 'uuid';
import {uploadImage,deleteImage} from '../actions';
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';

import { Box,Button, Grid } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useDispatch } from "react-redux";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default (props)=>{
    const [portfolioImages,setPortfolioImages] = React.useState([]);
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };
    const {
        classes,
        images
    } = props;
    // called every time a file's `status` changes
    const handleChangeStatus = ({ meta, file }, status) => { 
        console.log(status, meta, file) 
        if(status === 'done'){
            let ref = 'images/' + uuidv4();
            setPortfolioImages(portfolioImages.concat({file,ref}));
            dispatch(uploadImage(file,ref));
        }
        if(status === 'removed'){
            portfolioImages.map(image=>{
                if(image.file.name===file.name){
                    dispatch(deleteImage(image))
                }
                return null
            })
            setPortfolioImages(portfolioImages.filter((f)=>f.file.name !== file.name));

        }
    }
    let imageGrid = "";
    if(images && images.length>0){
        imageGrid = <Grid container spacing={2}>
                    {
                        images.map((img,i)=>(
                            <Grid item xs={6} md={4}>
                                <Box display="flex" justifyContent="center" padding="1em">
                                    <img style={{maxWidth:'20vw',maxHeight:'30vh'}} src={img.url} alt="img" />
                                </Box> 
                            </Grid>
                        ))
                    }
                    </Grid>
    }

    const handleNext = ()=>{

        if(portfolioImages.length<3){
            if(!(images && images.length>0)){
                setOpen(true);
                return;
            }
        }
        props.handleSubmit();
    }

    return(
        <Box>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    Please select at least 3 Images.
                </Alert>
            </Snackbar>
            <Box>
                {imageGrid}
            </Box>
            <Box mt="2em">
                <Dropzone
                    onChangeStatus={handleChangeStatus}
                    accept="image/*"
                    maxSizeBytes={5242880}
                    inputContent={(files, extra) => (extra.reject ? 'Image, audio and video files only' : 'Drag Portfolio Images or Click to Browse')}
                    inputWithFilesContent = "Add more images"
                    styles={{
                        dropzone:{overflow:'hidden',minHeight:'9em'},
                        dropzoneReject: { borderColor: 'red', backgroundColor: '#DAA' },
                        inputLabel: (files, extra) => (extra.reject ? { color: 'red' } : {}),
                        preview: {justifyContent:'center'},
                        inputLabelWithFiles: {alignSelf: 'center',margin:'1em'},
                        previewImage: {maxWidth:'60%',maxHeight: '60vh'}
                    }}
                />
            </Box>
            <Box mt="2em">
                <Button
                        onClick={props.handleBack}
                        className={classes.button}
                    >
                    Back
                    </Button>
                <Button type="button" variant="contained" onClick={handleNext} className={classes.button} color="primary">Submit</Button>
            </Box>
            
        </Box>
        
    )
}