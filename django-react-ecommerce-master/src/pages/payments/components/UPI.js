import React from 'react'

import { Grid,Box,Typography,Avatar,Stack, Button} from '@material-ui/core'

function UPI() {
    return (
        <>
         <Box sx={{ flexGrow: 1,margin:"20px"}}>
            <Typography variant="h5" gutterBottom>
                Payment method
            </Typography>
        
            <Grid container sx={{marginLeft:"50px",marginTop:"30px"}}>
                <Grid container>
                    <Stack direction="row" spacing={15} alignItems="center">
                        <Stack direction="row" spacing={3} alignItems="center">
                            <Avatar src="https://img.icons8.com/color/48/000000/paytm.png" />
                            <Typography variant="h8">
                                Paytm
                            </Typography>
                        </Stack>
                        
                        <Button variant="contained" color="success" size="large">Pay Now</Button>
                    </Stack>
                </Grid>
                
                <Grid container sx={{marginTop:"40px"}}>
                    <Stack direction="row" spacing={10} alignItems="center">
                        <Stack direction="row" spacing={3} alignItems="center">
                            <Avatar src="https://img.icons8.com/dusk/64/000000/google-pay.png" />
                            <Typography variant="h8">
                                Google Pay
                            </Typography>
                        </Stack>
                        <Button variant="contained" color="success" size="large">Pay Now</Button>
                    </Stack>
                </Grid>
                
            </Grid>
        </Box>
        </>
    )
}

export default UPI
