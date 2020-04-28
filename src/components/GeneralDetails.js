import React from 'react';

import { Grid,TextField,Box,Button } from '@material-ui/core';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { withFormik } from "formik";
import * as Yup from 'yup';

const generalDetailForm = (props)=>{
    const {
        classes,
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        handleBack,
        setFieldValue
    } = props;
    return(
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <TextField
                    id="height"
                    label="Height in cm"
                    value={values.height}
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.height ? errors.height : ""}
                    error={touched.height && Boolean(errors.height)}
                    className={classes.txtField}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    id="weight"
                    label="Weight in kg"
                    value={values.weight}
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.weight ? errors.weight : ""}
                    error={touched.weight && Boolean(errors.weight)}
                    className={classes.txtField}

                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    id="address"
                    label="Full address"
                    value={values.address}
                    className={classes.txtField}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.address ? errors.address : ""}
                    error={touched.address && Boolean(errors.address)}
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        variant="inline"
                        inputVariant="outlined"
                        format="MM/dd/yyyy"
                        id="dob"
                        placeholder="MM/dd/yyyy"
                        label="Date of birth"
                        value={values.dob}
                        onChange={date => setFieldValue('dob', date, false)}
                        onBlur={handleBlur}
                        helperText={touched.dob ? errors.dob : ""}
                        error={touched.dob && Boolean(errors.dob)}
                        className={classes.datepicker}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12}>
                <Box mt="1em">
                    <Button
                        onClick={handleBack}
                        className={classes.button}
                    >
                    Back
                    </Button>
                    <Button type="button" variant="contained" onClick={handleSubmit} className={classes.button} color="primary">Next</Button>
                </Box>
            </Grid>
        </Grid>
    )
}

const GeneralDetailForm = withFormik({
    mapPropsToValues: ({
      height,
      weight,
      dob,
      address
    }) => {
      return {
        height: height || "",
        weight: weight || "",
        dob: dob || new Date(),
        address: address || ""
      };
    },
  
    validationSchema: Yup.object().shape({
      height: Yup.number()
      .required("Enter your height")
      .positive()
      .integer(),
      weight: Yup.number()
      .required("Enter your weight")
      .positive(),
      dob: Yup.date().default(new Date()).required('Date of birth is required'),
      address: Yup.string().required("Address is Required")
    }),
  
    handleSubmit: (values, bag) => {
        bag.props.handleFieldsChange(values);
        bag.props.handleNext();
    }
  })(generalDetailForm);

export default GeneralDetailForm;