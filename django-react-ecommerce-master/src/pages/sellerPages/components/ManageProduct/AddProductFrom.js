import React from 'react'
import { Formik,Form,Field,ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { TextField,Grid,Paper,Button} from '@material-ui/core'

function AddProductFrom() {
    const paperStyle = { padding: '0 15px 40px 15px', width: 250, }
    const btnStyle = { marginTop: 20 }
    

    const initialValues = {
        productImage:'',
        productProposal:'',
        product_name: '',
        stock: '',
        product_price: '',
        product_discription:''
    }
    const validationSchema = Yup.object().shape({
        product_name: Yup.string().min(2, "It's too short").required("Required"),
        stock:Yup.number().min(5).required('Product stock must be atleast 5'),
        product_price:Yup.number().min(1).required('Please enter Price'),
        product_discription:Yup.string().min(5,"Discription is too short").required("Required")
    })

// Helping Article
// https://codersingh.medium.com/image-upload-in-reactjs-using-formik-e9766ad87d64
// https://www.youtube.com/watch?v=XeiOnkEI7XI

    const onSubmit = (values, props) => {
        let data=new FormData();
        // setTimeout(() => {
            
            

        //   }, 1000);

        data.append("productImage",values.productImage);
        data.append("productProposal",values.productProposal);
        data.append("product_name",values.product_name);
        data.append("stock",values.stock);
        data.append("product_price",values.product_price);
            
        alert(JSON.stringify(data),null,2);
        console.log(data);
        props.resetForm()
    }

    return (
        <Grid>
            <Paper elevation={0} style={paperStyle}>
                
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {(props) => (
                        <Form noValidate>
                            <label>Product Image</label>
                            <input type='file' name="image_file" style={{margin:"10px"}} 
                            onChange={(event) =>{
                                props.setFieldValue("productImage", event.target.files[0]);
                              }}/>

                            <label style={{marginTop:"10px"}}>Product Proposal</label>
                            <input type='file' name="proposal_file" style={{margin:"10px"}}
                            onChange={(event) =>{
                                props.setFieldValue("productProposal", event.target.files[1]);
                              }}/>
                           
                            <Field as={TextField} name='product_name' label='Product Name' fullWidth
                                error={props.errors.product_name && props.touched.product_name}
                                helperText={<ErrorMessage name='product_name' />} required />

                            <Field as={TextField} name='stock' label='Product Stock' fullWidth
                                error={props.errors.stock && props.touched.stock}
                                helperText={<ErrorMessage name='stock' />} required />

                            <Field as={TextField} name="product_price" label='Price' fullWidth required 
                            error={props.errors.product_price && props.touched.product_price}
                            helperText={<ErrorMessage name='product_price' />} required />

                            <Field as={TextField} name="product_discription" label='Discription' fullWidth required 
                            error={props.errors.product_discription && props.touched.product_discription}
                            helperText={<ErrorMessage name='product_discription' />} required />

                            <Button type='submit' style={btnStyle} variant='contained'
                                color='primary'>Add</Button>
                        </Form>
                    )}
                </Formik>
            </Paper>
        </Grid>
    )
}

export default AddProductFrom
