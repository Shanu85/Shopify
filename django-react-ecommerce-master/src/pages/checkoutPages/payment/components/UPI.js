import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Grid, Box, Typography, Avatar, Button } from '@material-ui/core'
import { createOrder } from "@actions/profileActions/orderActions";
import { fetchCart } from "@actions/cartActions";
import { fetchAddresses } from "@actions/profileActions/AddressActions";
import GPay from "./images/gpay.png";
import PayTm from "./images/paytm.png";

function UPI({history}) {
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
        <>
            <Box sx={{ flexGrow: 1, margin: "20px" }}>
                <Typography variant="h5" gutterBottom>
                    Payment method
                </Typography>

                <Grid container sx={{ marginLeft: "50px", marginTop: "30px" }}>
                    <Grid container alignItems="center" lg={12}>
                        <Grid item lg={2}>
                            <Avatar src={PayTm} />
                        </Grid>
                        <Grid item lg={4}>
                            <Typography variant="h8">
                                Paytm
                            </Typography>
                        </Grid>
                        <Grid item lg={6}>
                            <Button variant="contained" color="success" size="large" onClick={() => handleClick("PayTm")}>Pay Now</Button>
                        </Grid>
                    </Grid>

                    <Grid container alignItems="center" lg={12} sx={{ marginTop: "40px" }}>
                        <Grid item lg={2}>
                            <Avatar src={GPay} />
                        </Grid>
                        <Grid item lg={4}>
                            <Typography variant="h8">
                                Google Pay
                            </Typography>
                        </Grid>
                        <Grid item lg={6}>
                            <Button variant="contained" color="success" size="large" onClick={() => handleClick("GooglePay")}>Pay Now</Button>
                        </Grid>
                    </Grid>

                </Grid>
            </Box>
        </>
    )
}

export default UPI
