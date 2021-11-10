import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { TextField, Grid, Paper, Button } from '@material-ui/core'

function EditProductForm({ onClose, sellerProduct }) {
    const paperStyle = { padding: '0 15px 40px 15px', width: 450, }
    const btnStyle = { marginTop: 20 }

    const values = {
        stock: sellerProduct['sale_count'],
        product_price: sellerProduct['price'],
        discount_price: sellerProduct['discount_price'],
    }

    const validationSchema = Yup.object().shape({
        stock: Yup.number().min(10).required('Product stock must be atleast 10'),
        product_price: Yup.number().min(50).required('Product stock must be atleast 50'),
        discount_price: Yup.number().min(0).required('Discount Price should be less than or equal to Product Price'),
    })

    const onSubmit = (values, actions) => {
        if (parseFloat(values['stock']) < 10) {
            alert("Product stock should be greater or equal to 10");
        }
        else if (parseFloat(values['stock']) % 1 !== 0) {
            alert("Product stock should be integer only");
        }
        else if (parseFloat(values['product_price']) < 50) {
            alert("Product price should be greater or equal to 50");
        }
        else if (parseFloat(values['discount_price']) > parseFloat(values['product_price'])) {
            alert("Discount price should be less or equal to product price");
        }
        else if (parseFloat(values['discount_price']) < 50) {
            alert("Discount price should be greater or equal to 50");
        }

        sellerProduct['sale_count'] = values['stock'];
        sellerProduct['price'] = values['product_price'];
        sellerProduct['discount_price'] = values['discount_price'];
        onClose(sellerProduct);
    }

    return (
        <Grid>
            <Paper elevation={0} style={paperStyle}>

                <Formik initialValues={values} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {(props) => (
                        <Form onSubmit={props.handleSubmit}>

                            <Field as={TextField} name='stock' label="Product Stock" placeholder={props.values.stock} values={props.values.stock}
                                onChange={props.handleChange} fullWidth error={props.errors.stock && props.touched.stock}
                                helperText={<ErrorMessage name='stock' />} required style={{ marginTop: "10px" }} />

                            <Field as={TextField} name="product_price" label="Product Price" placeholder={props.values.product_price} values={props.values.product_price}
                                onChange={props.handleChange} fullWidth required error={props.errors.product_price && props.touched.product_price}
                                helperText={<ErrorMessage name='product_price' />} required style={{ marginTop: "10px" }} />

                            <Field as={TextField} name="discount_price" label="Discount Price" placeholder={props.values.discount_price} values={props.values.discount_price}
                                onChange={props.handleChange} fullWidth required error={props.errors.discount_price && props.touched.discount_price}
                                helperText={<ErrorMessage name='discount_price' />} required style={{ marginTop: "10px" }} />


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