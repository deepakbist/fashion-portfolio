import React from 'react';

import { Grid,TextField, Button,Box } from '@material-ui/core';
import { withFormik } from "formik";
import * as Yup from 'yup';


const profileDetailForm = (props)=>{
    const {
        classes,
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
      } = props;
    return(
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <TextField
                    id="firstName"
                    label="First Name"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.firstName ? errors.firstName : ""}
                    error={touched.firstName && Boolean(errors.firstName)}
                    variant="outlined"
                    className={classes.txtField}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    id="lastName"
                    label="Last Name"
                    value={values.lastName}
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.lastName ? errors.lastName : ""}
                    error={touched.lastName && Boolean(errors.lastName)}
                    className={classes.txtField}

                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    id="email"
                    label="Email"
                    value={values.email}
                    className={classes.txtField}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.email ? errors.email : ""}
                    error={touched.email && Boolean(errors.email)}
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    id="mobile"
                    label="Contact number"
                    value={values.mobile}
                    className={classes.txtField}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.mobile ? errors.mobile : ""}
                    error={touched.mobile && Boolean(errors.mobile)}
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={12}>
                <Box mt="1em">
                    <Button type="button" variant="contained" onClick={handleSubmit} className={classes.button} color="primary">Next</Button>
                </Box>
            </Grid>
        </Grid>
    )
}

const ProfileDetailForm = withFormik({
        mapPropsToValues: ({
          firstName,
          lastName,
          email,
          mobile,
        }) => {
          return {
            firstName: firstName || "",
            lastName: lastName || "",
            email: email || "",
            mobile: mobile || "",
          };
        },
      
        validationSchema: Yup.object().shape({
          firstName: Yup.string().required("Required"),
          lastName: Yup.string().required("Required"),
          email: Yup.string().email("Enter a valid email").required("Email is required"),
          mobile: Yup.string().matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Phone number is not valid').required("Contact number is required"),
        }),
      
        handleSubmit: (values,bag) => {
          bag.props.handleFieldsChange(values);
          bag.props.handleNext();
          
        }
      })(profileDetailForm);
    
    export default ProfileDetailForm;
