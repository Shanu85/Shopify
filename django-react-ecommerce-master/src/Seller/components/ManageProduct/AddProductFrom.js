import React from 'react'
import { Formik,Form,Field,ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { TextField,Grid,Paper,Button} from '@material-ui/core'


function AddProductFrom() {
    const paperStyle = { padding: '0 15px 40px 15px', width: 250, }
    const btnStyle = { marginTop: 10 }
    
    const initialValues = {
        product_name: '',
        stock: '0',
        product_price: '0'
    }
    const validationSchema = Yup.object().shape({
        product_name: Yup.string().min(2, "It's too short").required("Required"),
        stock:Yup.number().required('Product stock must be atleast 1')
    })
    const onSubmit = (values, props) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
 
          }, 1000);
        props.resetForm()
    }

    return (
        <Grid>
            <Paper elevation={0} style={paperStyle}>
                
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {(props) => (
                        <Form noValidate>
                            <input type='file' name="file">

                            </input>
                            <Field as={TextField} name='product_name' label='Product Name' fullWidth
                                error={props.errors.product_name && props.touched.product_name}
                                helperText={<ErrorMessage name='product_name' />} required />

                            <Field as={TextField} name='stock' label='Product Stock' fullWidth
                                error={props.errors.stock && props.touched.stock}
                                helperText={<ErrorMessage name='stock' />} required />

                            <Field as={TextField} name="product_price" label='Price' fullWidth required />

                            <Button type='submit' style={btnStyle} variant='contained'
                                color='primary'>Register</Button>
                        </Form>
                    )}
                </Formik>
            </Paper>
        </Grid>
    )
}

export default AddProductFrom
