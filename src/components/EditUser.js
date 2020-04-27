import React from 'react';

import ProfileDetails from './ProfileDetails';
import GeneralDetails from './GeneralDetails';
import ImagesForm from './ImagesForm';
import {updatePortfolioDB} from '../actions';
import { useHistory } from "react-router-dom";


import { useSelector,useDispatch } from "react-redux";

//material ui
import { Grid, Container,Typography,Stepper,Step,StepLabel,Button,Box,TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { object } from 'yup';



const useStyles = makeStyles((theme) => ({
    mainGrid:{
        background: '#f2f2f2',
        minHeight: '100vh',
        padding: '1em'
    },
    formContainer: {
        padding: '2em',
        background: '#fff',
        borderRadius: '0.5em',
        textAlign:'center',
        marginTop: '4em'
    },
    txtField:{
        width: '100%'
    },
    button: {
        marginRight: theme.spacing(1),
        width: '10em'
    },
    datepicker:{
        width: '100%'
    }
}));

const initialValues = {
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    height: '',
    address: '',
    weight: '',
    dob: '',
    files: []
}

const UserForm = props =>{
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUser = useSelector(state => state.currentUser);
    const [values, setValues] = React.useState(currentUser ? currentUser : initialValues);
    console.log("in userform",currentUser,values);

    const [activeStep, setActiveStep] = React.useState(0);
    const steps = ['Profile Detail', 'General Detail', 'Portfolio Images'];
    

    
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleChange = (receivedValues)=>{
        setValues(Object.assign({},values,receivedValues));
    }

    const handleSubmit = ()=>{
        values.images = currentUser.images
        setValues(values);
        dispatch(updatePortfolioDB(values));
        history.push('/portfolio')
    }

    
    

    return (
        <React.Fragment>
            <Grid className={classes.mainGrid} container spacing={4} className={classes.mainGrid}>
                <Grid item xs={12} >
                    <Container maxWidth="md" className={classes.formContainer}>
                        <Typography variant="h4" gutterBottom>
                            Edit portfolio
                        </Typography>
                        <Box mt="1em">
                            <Stepper activeStep={activeStep} alternativeLabel>
                                {steps.map((label, index) => {
                                    const stepProps = {};
                                    const labelProps = {};
                                    return (
                                        <Step key={label} {...stepProps}>
                                        <StepLabel {...labelProps}>{label}</StepLabel>
                                        </Step>
                                    );
                                })}
                            </Stepper>
                        </Box>
                        <Box mt="1em">
                            {
                                activeStep === 0 &&
                                <ProfileDetails firstName={values.firstName} lastName={values.lastName} email={values.email} mobile={values.mobile} classes={classes} handleNext={handleNext} handleFieldsChange={handleChange}  />
                                
                            }
                            {
                                activeStep === 1 && 
                                <GeneralDetails address={values.address} height={values.height} weight={values.weight} values={values.dob} values={values} classes={classes} handleNext={handleNext} handleBack={handleBack} handleFieldsChange={handleChange} />
                            }
                            {
                                activeStep === 2 && 
                                <ImagesForm values={values} classes={classes} handleSubmit={handleSubmit} handleBack={handleBack} images={currentUser.images} /> 
                            }
                        </Box>                         
                     </Container>
                 </Grid>
             </Grid>
         </React.Fragment>
    )
}

export default UserForm;