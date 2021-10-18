import React from 'react'
<<<<<<< HEAD
import { Grid,Paper,Button} from '@material-ui/core'
import { useState } from 'react';
import {email_reg} from '../../../authPages/regexes';
import { useDispatch } from "react-redux";
import {updateSellerInfo} from '../../../../redux/actions/authActions'

function Info_Edit_form({First_Name,Last_Name,Phone_No,National_Code,email}) {
    const paperStyle = { padding: '0 15px 40px 15px', width: 450, }

    const dispatch = useDispatch();

    const[FirstName,setFirstName]=useState(First_Name);
    const[LastName,setLastName]=useState(Last_Name);
    const [PhoneNo,setPhoneNo]=useState(Phone_No);
    const [NationalCode,setNationalCode]=useState(National_Code);
    const [Email,setEmail]=useState(email);
    

    function isNumber(n) { return !isNaN(n) }

    const handleSubmit = () => {
        
        if(!email_reg.test(Email)){
            alert( 'Invalid Email');
            event.preventDefault();
            return;
        }
        if(FirstName==='')
        {
            alert("Please enter First Name");
            event.preventDefault();
            return;
        }
        if(LastName==='')
        {
            alert("Please enter Last Name");
            event.preventDefault();
            return;
        }
        if(PhoneNo.length!=10)
        {
            alert("Invalid phone number");
            event.preventDefault();
            return;
        }
        if(NationalCode.length!=6 && isNumber(NationalCode))
        {
            alert("Please enter valid National Code");
            event.preventDefault();
            return;
        }
        const user={FirstName,LastName,PhoneNo,NationalCode,Email};

        // dispatch(updateSellerInfo(user,history));
        
        alert(`${FirstName} ${LastName} ${PhoneNo} ${NationalCode} ${Email}`)
=======
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { TextField, Grid, Paper, Button } from '@material-ui/core'
import { phone_number_reg, national_code_reg } from "../../../authPages/regexes";

function Info_Edit_form({ First_Name, Last_Name, Phone_No, National_Code, Email }) {
    const paperStyle = { padding: '0 15px 40px 15px', width: 450, }
    const btnStyle = { marginTop: 20 }
    const initialValues = {
        first_name: First_Name,
        last_name: Last_Name,
        phone: Phone_No,
        code: National_Code,
        email: Email
    }

    //yup.string().test('len', 'Must be exactly 5 characters', val => val.length === 5)
    const validationSchema = Yup.object().shape({
        first_name: Yup.string().test('len', 'Please enter First Name', val => val.length >= 1),
        last_name: Yup.string().test('len', 'Please enter Last Name', val => val.length >= 1),
        phone: Yup.string().matches(phone_number_reg, "Invalid phone number").required("Required field"),
        email: Yup.string().email().required("Required field"),
        code: Yup.string().matches(national_code_reg, "Invalid National Code"),
    })

    const onSubmit = ({ first_name, last_name, phone, code, email }, { setErrors, resetForm }) => {
        alert(first_name);
        console.log(first_name);
        resetForm()
>>>>>>> dfff0854055c8759ac3b07a4d0e622ccb6aa3666
    }

    return (
        <Grid>
            <Paper elevation={0} style={paperStyle}>
<<<<<<< HEAD
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    
                    <Grid item xs={5}>
                        <label>First Name</label>
                    </Grid>
                    <Grid item xs={7}>
                    <input type="text" value={FirstName} placeholder={FirstName} onChange={(event) =>{
                    setFirstName(event.target.value);}} required/>
                    </Grid>

                    <Grid item xs={5}>
                        <label>Last Name</label>
                    </Grid>
                    <Grid item xs={7}>
                    <input type="text" value={LastName} placeholder={LastName} onChange={(event) =>{
                                setLastName(event.target.value);}} required/>
                    </Grid>

                    <Grid item xs={5}>
                    <label>Phone Number</label>
                    </Grid>
                    <Grid item xs={7}>
                    <input type="tel" value={PhoneNo} pattern="[789][0-9]{9}" placeholder={PhoneNo} onChange={
                    (event)=>{
                        setPhoneNo(event.target.value)
                    }} required/>
                    </Grid>
                    
                    <Grid item xs={5}>
                    <label>National Code</label>
                    </Grid>
                    <Grid item xs={7}>
                    <input type="text" value={NationalCode} placeholder={NationalCode} onChange={
                    (event)=>{
                        setNationalCode(event.target.value)
                    }} required/>
                    </Grid>

                    <Grid item xs={5}>
                    <label>Email</label>
                    </Grid>
                    <Grid item xs={7}>
                    <input type="email" value={Email} placeholder={Email}
                    onChange={
                    (event)=>{
                        setEmail(event.target.value)
                    }} required/>
                    </Grid>
=======

                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {props => (
                        <Form onSubmit={onSubmit}>

                            <Field as={TextField} name='first_name' label="First Name" placeholder={initialValues.first_name} fullWidth
                                error={props.errors.first_name && props.touched.first_name}
                                helperText={<ErrorMessage name='first_name' />} required style={{ marginTop: "10px" }} />

                            <Field as={TextField} name='last_name' label="Last Name" placeholder={initialValues.last_name} fullWidth
                                error={props.errors.last_name && props.touched.last_name}
                                helperText={<ErrorMessage name='last_name' />} required style={{ marginTop: "10px" }} />

                            <Field as={TextField} name='phone' label="Phone Number" placeholder={initialValues.phone} fullWidth
                                error={Boolean(props.errors.phone) || Boolean(props.errors.non_field_errors)}
                                helperText={<ErrorMessage name='phone' />} required style={{ marginTop: "10px" }} />

                            <Field as={TextField} name='code' label="National Code" placeholder={initialValues.code} fullWidth
                                error={Boolean(props.errors.phone) || Boolean(props.errors.non_field_errors)}
                                helperText={<ErrorMessage name='code' />} required style={{ marginTop: "10px" }} />

                            <Field as={TextField} name='email' label="Email" placeholder={initialValues.email} fullWidth
                                error={props.errors.email && props.touched.email}
                                helperText={<ErrorMessage name='email' />} required style={{ marginTop: "10px" }} />
>>>>>>> dfff0854055c8759ac3b07a4d0e622ccb6aa3666

                    
                    <Grid item xs={6}></Grid>
                    <Grid item xs={6}>
                        <button type="submit" style={{background:"green",color:"white",fontWeight:"bold"}}>Submit</button>
                    </Grid>
                </Grid>
            </form>
                
            </Paper>
        </Grid>
    )
}

<<<<<<< HEAD
export default Info_Edit_form

=======
export default Info_Edit_form
>>>>>>> dfff0854055c8759ac3b07a4d0e622ccb6aa3666
