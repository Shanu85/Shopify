import React from 'react'
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
    }

    return (
        <Grid>
            <Paper elevation={0} style={paperStyle}>
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

export default Info_Edit_form

