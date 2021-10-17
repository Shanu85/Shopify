import React from 'react'
import Seller_Sidebar from '../Seller_Sidebar'
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Seller_Deposits from './Seller_Deposits';
import { Typography } from '@material-ui/core';
import { makeStyles,Button,Link } from '@material-ui/core';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
    root: {
      marginTop: theme.spacing(3)
    },
    padding: {
      padding: theme.spacing(2)
    },
    header: {
      marginTop: theme.spacing(2)
    },
    button: {
      padding: theme.spacing(1.3)
    }
  }));

  
function Seller_Dashboard() {
    const {
        first_name,
        last_name,
        phone_number,
        national_code,
        email
    } = useSelector(state => state.auth.user);
    const classes = useStyles();
    
    return (
        <Seller_Sidebar activeItem="seller_dashboard">
             <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
            {/* <Toolbar /> */}
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }} className={classes.root}>
                <Grid container spacing={3}>
                
                    <Grid item xs={12} md={8} lg={9}>
                        <Paper 
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 400,
                                backgroundColor:"pink"
                            }}
                        >
                            <Typography style={{margin:"30px 0px 0px 20px"}} variant="h6">
                                Personal Info
                            </Typography>
                            <Paper >
                                <Grid container spacing={2} className={classes.padding}>
                                <Grid item md={6} xs={12}>
                                    <Typography variant="body1">First name:</Typography>
                                    <Typography variant="h8">{first_name || "-"}</Typography>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <Typography variant="body1">Phone number:</Typography>
                                    <Typography variant="h8">{phone_number || "-"}</Typography>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <Typography variant="body1">Last name:</Typography>
                                    <Typography variant="h8">{last_name || "-"}</Typography>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <Typography variant="body1">National code:</Typography>
                                    <Typography variant="h8">{national_code || "-"}</Typography>
                                </Grid>
                                <Grid item md={12}>
                                    <Typography variant="body1">Email:</Typography>
                                    <Typography variant="h8">{email || "-"}</Typography>
                                </Grid>
                                </Grid>
                                <Button
                                component={Link}
                                
                                color="primary"
                                fullWidth
                                size="large"
                                className={classes.button}
                                >
                                Edit
                                </Button>
                            </Paper>
                        </Paper>
                    </Grid>
                
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 170,
                        }}
                        >
                        <Seller_Deposits/>
                        </Paper>
                    </Grid>
                </Grid>
                
            </Container>
            </Box>

        </Seller_Sidebar>
    )
}

export default Seller_Dashboard
