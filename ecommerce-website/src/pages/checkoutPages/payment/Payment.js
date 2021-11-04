import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { Button,Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import CartSummary from '../cart/components/CartSummary';
import { useEffect,useState } from 'react';
const REACT_APP_RAZORPAY_PUBLIC_KEY="rzp_test_QaWbhtFi6r6szP"
const REACT_APP_RAZORPAY_PRIVATE_KEY="9IqinUMN8hjKvhq6XhHxbHT7";
import { createOrder } from "@actions/profileActions/orderActions";
import { fetchCart } from "@actions/cartActions";
import { fetchAddresses } from "@actions/profileActions/AddressActions";

function Title(props) {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom style={{margin:"10px"}}>
      {props.children}
    </Typography>
  );
}

export default function Payment({history}) {
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

  const address = addresses[0];
  const dispatch = useDispatch();
  const [data, setdata] = useState(null);

  // var pay_instance = new Razorpay({
  //   key_id: REACT_APP_RAZORPAY_PUBLIC_KEY,
  //   key_secret: REACT_APP_RAZORPAY_PRIVATE_KEY,
  // });

  const options = {
    key: REACT_APP_RAZORPAY_PUBLIC_KEY,
    amount: Math.round(cart.total_price*100), //  = USD
    currency:"INR", 
    name: 'Shopify',
    description: 'Transaction Amount',
    image: 'https://cdn.razorpay.com/logos/7K3b6d18wHwKzL_medium.png',
    handler: function(response) {
        
        if (typeof response.razorpay_payment_id == 'undefined' ||  response.razorpay_payment_id < 1) {
          alert("Payment unsuccessful");
        } else {

          alert(response.razorpay_payment_id);
          
          //console.log('data',pay_instance.payments.fetch(response.razorpay_payment_id));
          const order = {
            reciver: {
              full_name: address.reciver_full_name,
              phone_number: address.reciver_phone_number,
              address: `${address.state} ${address.city} ${address.postal_address} ${address.postal_code}`
            },
            payment_mode: "card"
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
    }
  };


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


  const openPay=()=>{
    var paywindow=new window.Razorpay(options);
    paywindow.open();
  }

  return (
    <>
       <Grid container spacing={2} style={{marginTop:"100px"}}>
          <Grid item lg={4} md={4} xs={12}/>
          <Grid item lg={4} md={4} xs={12}>
          <Title>Payment Details</Title>
            <CartSummary cart={cart} />
            <Button style={{background:"green",color:"white"}} onClick={openPay}>Pay with Razorpay</Button>
          </Grid>
          <Grid item lg={4} md={4} xs={12}/>
        </Grid>
    </>
  );
}