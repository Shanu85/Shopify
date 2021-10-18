import React from 'react'
import { Formik,Form,Field,ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { TextField,Grid,Paper,Button} from '@material-ui/core'
import { phone_number_reg,national_code_reg } from "../../../authPages/regexes";

function Info_Edit_form({First_Name,Last_Name,Phone_No,National_Code,Email}) {
    const paperStyle = { padding: '0 15px 40px 15px', width: 450, }
    const btnStyle = { marginTop: 20 }
    const initialValues = {
        first_name:First_Name,
        last_name:Last_Name,
        phone:Phone_No,
        code:National_Code,
        email:Email
    }

    //yup.string().test('len', 'Must be exactly 5 characters', val => val.length === 5)
    const validationSchema = Yup.object().shape({
        first_name:Yup.string().test('len','Please enter First Name',val=>val.length>=1),
        last_name:Yup.string().test('len','Please enter Last Name',val=>val.length>=1),
        phone: Yup.string().matches(phone_number_reg, "Invalid phone number").required("Required field"),
        email: Yup.string() .email() .required("Required field"),
        code:Yup.string().matches(national_code_reg,"Invalid National Code"),
    })

    const onSubmit = (values, props) => {
        props.resetForm()
    }

    return (
        <Grid>
            <Paper elevation={0} style={paperStyle}>
                
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {(props) => (
                        <Form onSubmit={onSubmit}>
                            
                            <Field as={TextField} name='first_name' label="First Name" placeholder={initialValues.first_name} fullWidth
                                error={props.errors.first_name && props.touched.first_name}
                                helperText={<ErrorMessage name='first_name' />} required style={{marginTop:"10px"}}/>

                            <Field as={TextField} name='last_name' label="Last Name" placeholder={initialValues.last_name} fullWidth
                                error={props.errors.last_name && props.touched.last_name}
                                helperText={<ErrorMessage name='last_name' />} required style={{marginTop:"10px"}}/>
                            
                            <Field as={TextField} name='phone' label="Phone Number" placeholder={initialValues.phone} fullWidth
                                error={Boolean(props.errors.phone) || Boolean(props.errors.non_field_errors)}
                                helperText={<ErrorMessage name='phone' />} required style={{marginTop:"10px"}}/>

                            <Field as={TextField} name='code' label="National Code" placeholder={initialValues.code} fullWidth
                                error={ Boolean(props.errors.phone) || Boolean(props.errors.non_field_errors) }
                                helperText={<ErrorMessage name='code' />} required style={{marginTop:"10px"}}/>

                            <Field as={TextField} name='email' label="Email" placeholder={initialValues.email} fullWidth
                                error={props.errors.email && props.touched.email}
                                helperText={<ErrorMessage name='email' />} required style={{marginTop:"10px"}}/>

                            <Button type='submit' style={btnStyle} variant='contained'
                                color='primary' >Edit</Button>
                        </Form>
                    )}
                </Formik>
            </Paper>
        </Grid>
    )
}

export default Info_Edit_form
