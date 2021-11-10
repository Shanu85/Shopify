import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Grid, Box, Typography, Button } from '@material-ui/core'
import { fetchAddresses } from "@actions/profileActions/AddressActions";
const REACT_APP_RAZORPAY_PUBLIC_KEY="rzp_test_QaWbhtFi6r6szP"
import { createOrder } from "@actions/profileActions/orderActions";
import { fetchCart } from "@actions/cartActions";

function UPI({history}) {
    
    const [paymentMethod,setpaymentMethod]=useState('');
    
    const {
        cart,
        ui: { loadingUI },
        profile: { addresses }
      } = useSelector(state => state);
      
      const {
        first_name,
        last_name,
        phone_number,
        email
      } = useSelector(state => state.auth.user);

    const options = {
        key: REACT_APP_RAZORPAY_PUBLIC_KEY,
        amount: Math.round(cart.total_price/75)*100,
        // method:paymentMode,
        currency:"USD", 
        method:{
            card:(paymentMethod==='card'),
            netbanking:(paymentMethod==='netbanking'),
            upi:(paymentMethod==='upi'),
            wallet:false,
            paylater:false,
            
        },
        name: 'Shopify',
        description: 'Transaction Amount',
        image: 'https://cdn.razorpay.com/logos/7K3b6d18wHwKzL_medium.png',
        handler: function(response) {
            
            if (typeof response.razorpay_payment_id == 'undefined' ||  response.razorpay_payment_id < 1) {
              alert("Payment unsuccessful");
            } else {
    
              //alert(response.razorpay_payment_id);
              
              //console.log('data',pay_instance.payments.fetch(response.razorpay_payment_id));
              const order = {
                receiver: {
                    
                  full_name: address.receiver_full_name,
                  phone_number: address.receiver_phone_number,
                  address: `${address.state} ${address.city} ${address.postal_address} ${address.postal_code}`
                },
                payment_mode: paymentMethod,
                code:response.razorpay_payment_id,
              };
              dispatch(createOrder(order, history));
              
            }
        },
        prefill: {
            name: first_name+last_name,
            contact: phone_number,
            email: email
        },
        theme: {
            color: 'blue',
            hide_topbar: false
        },
        notify:
        {
            sms:true,
            email:true
        }
      };

      
    

      const address = addresses[0];
  
    const dispatch = useDispatch();

    
    const handleClick = (payment_mode) => {
        
        setpaymentMethod(payment_mode);
        
    };

    useEffect(()=>{
        if(paymentMethod!=='')
        {
            var paywindow=new window.Razorpay(options);
            paywindow.open();
        }
        
    },[paymentMethod])

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
      }, [])

    useEffect(() => {
        dispatch(fetchCart());
        dispatch(fetchAddresses());
    }, [dispatch]);

    return (
        <>
            <Box sx={{ flexGrow: 1, margin: "20px" }}>
                <Typography variant="h5" gutterBottom>
                    Payment method
                </Typography>

                <Grid container sx={{ marginLeft: "50px", marginTop: "30px" }}>
                    <Grid container alignItems="center" lg={12}>
                        <Grid item lg={2}>
                            
                        </Grid>
                        <Grid item lg={4}>
                            <Typography variant="h8">
                                Card
                            </Typography>
                        </Grid>
                        <Grid item lg={6}>
                            <Button variant="contained" color="success" size="large" style={{background:"green", color:"white"}} onClick={() => handleClick("card")}>Pay Now</Button>
                        </Grid>
                    </Grid>
                    
                </Grid>
            </Box>
        </>
    )
}

export default UPI
