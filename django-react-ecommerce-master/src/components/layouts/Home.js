import { Link as RouterLink } from "react-router-dom";
import React from "react";
import { CardMedia } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';


function Home() {
  return (
    
    <div>
        <Grid height="100vh"  display="flex" direction="column" padding="20px">
        <Grid item lg={10}>
            <Grid display="flex" direction="row" height="100%">
                <Grid item lg={6} >
                    <div style={{ display:'flex', justifyContent:'center' }}>
                        <Card  sx={{ maxWidth: "80%", border:"none", boxShadow:"none"}}>
                            <CardMedia
                                component="img"
                                image="https://i.ibb.co/DG69bQ4/2.png"
                            />
                        </Card>
                    </div>
                </Grid>
                <Grid item lg={6}>
                    <Box
                    display="flex"
                    
                    justifyContent="center"
                    alignItems="center"
                    minHeight="50vh"
                    >
                        <Container>
                        <Typography variant="h2" fontWeight="600" color="black">
                                    Autumn Collection
                        </Typography>
                        <Typography variant="h6"  color="black" margin="20px 0px" >
                            DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.
                        </Typography>
                        <Button component={RouterLink} to="/products" variant="contained" color="success">
                          SHOP NOW
                        </Button>
                        </Container>
                        </Box>
                </Grid>
            </Grid>
        </Grid>
        <Grid item lg={2} bgcolor="palegreen">
            there
        </Grid>
    </Grid>

    </div>
    
  );
}

export default Home
