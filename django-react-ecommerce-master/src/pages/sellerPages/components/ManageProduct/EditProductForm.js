import React from 'react'
import { Formik,Form,Field,ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { TextField,Grid,Paper,Button} from '@material-ui/core'

function EditProductForm({productStock,productPrice}) {
    const paperStyle = { padding: '0 15px 40px 15px', width: 450, }
    const btnStyle = { marginTop: 20 }

    const initialValues = {
        
        stock:productStock,
        product_price: productPrice,
        
    }

    const validationSchema = Yup.object().shape({
        
        stock:Yup.number().min(5).required('Product stock must be atleast 5'),
        product_price:Yup.number().min(1).required('Please enter Price'),
        
    })

    const onSubmit = (values, props) => {
        props.resetForm()
    }
    return (
        <Grid>
            <Paper elevation={0} style={paperStyle}>
                
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {(props) => (
                        <Form noValidate>
                            
                            <Field as={TextField} name='stock' label="Product Stock" placeholder={initialValues.stock} fullWidth
                                error={props.errors.stock && props.touched.stock}
                                helperText={<ErrorMessage name='stock' />} required style={{marginTop:"10px"}}/>

                            <Field as={TextField} name="product_price" label="Product Price" placeholder={initialValues.product_price} fullWidth required 
                            error={props.errors.product_price && props.touched.product_price}
                            helperText={<ErrorMessage name='product_price' />} required  style={{marginTop:"10px"}}/>

                            
                            <Button type='submit' style={btnStyle} variant='contained'
                                color='primary'>Edit</Button>
                        </Form>
                    )}
                </Formik>
            </Paper>
        </Grid>
    )
}

export default EditProductForm
