import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { createOrder } from "@actions/profileActions/orderActions";
import { fetchCart } from "@actions/cartActions";
import { fetchAddresses } from "@actions/profileActions/AddressActions";

export default function CardPayment({history}) {
  const {
    cart,
    ui: { loadingUI },
    profile: { addresses }
  } = useSelector(state => state);
  const address = addresses[0];
  const dispatch = useDispatch();

  const handleClick = (payment_mode) => {
    const order = {
      reciver: {
        full_name: address.reciver_full_name,
        phone_number: address.reciver_phone_number,
        address: `${address.state} ${address.city} ${address.postal_address} ${address.postal_code}`
      },
      payment_mode: payment_mode
    };
    dispatch(createOrder(order, history));
  };

  useEffect(() => {
    dispatch(fetchCart());
    dispatch(fetchAddresses());
  }, [dispatch]);

  return (
    <div style={{ margin: "20px" }}>
      <Typography variant="h5" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            label="Name on card"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="success" onClick={() => handleClick("Card")}>
            Place Order
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
