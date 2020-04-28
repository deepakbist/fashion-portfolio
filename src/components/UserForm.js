import React from 'react';

import ProfileDetails from './ProfileDetails';
import GeneralDetails from './GeneralDetails';
import ImagesForm from './ImagesForm';

import {addPortfolioToDB} from '../actions';
import { useSelector,useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";


//material ui
import { Container,Typography,Stepper,Step,StepLabel,Box} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
    mainGrid:{
        background: '#f2f2f2',
        minHeight: '100vh'
    },
    formContainer: {
        padding: '2em',
        background: '#fff',
        borderRadius: '0.5em',
        textAlign:'center',
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
    images: []
}

const UserForm = props =>{

    const currentUser = useSelector(state => state.currentUser);
    const dispatch = useDispatch();
    const classes = useStyles();
    const [values, setValues] = React.useState(initialValues);
    const history = useHistory();

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
        dispatch(addPortfolioToDB(values));
        history.push('/portfolio');
    }

    
    return (
            <Box className={classes.mainGrid} display="flex" justifyContent="center" alignItems="center">
                <Container maxWidth="md" className={classes.formContainer}>
                    <Typography variant="h4" gutterBottom>
                        Create your fashion portfolio
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
                            <GeneralDetails address={values.address} height={values.height} weight={values.weight} dob={values.dob} values={values} classes={classes} handleNext={handleNext} handleBack={handleBack} handleFieldsChange={handleChange} />
                        }
                        {
                            activeStep === 2 && 
                            <ImagesForm values={values} classes={classes} handleBack={handleBack} handleSubmit={handleSubmit} /> 
                        }
                    </Box>                         
                    </Container>
            </Box>
    )
}

export default UserForm;