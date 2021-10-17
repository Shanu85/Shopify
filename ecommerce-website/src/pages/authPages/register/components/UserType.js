import React from 'react'
import { Button, Box, Grid, Typography } from "@material-ui/core";
import Buyer from "./images/buyer.png";
import Seller from "./images/seller.png";

export const UserType = ({changeType}) => {
    return (
        <>
            <div style={{ margin: '40px 0px 0px', textAlign: 'center' }}>
                <Typography variant="h2">CHOOSE YOUR ROLE:</Typography>
            </div>

            <Grid container style={{ margin: '20px 0px 0px', textAlign: 'center' }}>
                <Grid item xs={6} style={{ marginBottom: '50px' }}>
                    <Box
                        component="img"
                        sx={{
                            height: 'auto',
                            width: 'auto'
                        }}
                        alt="Buyer"
                        src={Buyer}
                    />
                </Grid>
                <Grid item xs={6} style={{ marginBottom: '50px' }}>
                    <Box
                        component="img"
                        sx={{
                            height: 'auto',
                            width: 'auto'
                        }}
                        alt="Seller"
                        src={Seller}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Button color="primary" variant="contained" onClick={changeType.setBuyer}>
                        Buyer
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button color="primary" variant="contained" onClick={changeType.setSeller}>
                        Seller
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}
