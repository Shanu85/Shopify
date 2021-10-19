import React from 'react'
import Admin_Sidebar from '../Admin_Sidebar'
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import { makeStyles, Button, Modal } from '@material-ui/core';

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
    },
    wrapper: {
        padding: theme.spacing(2)
    },
    iconButton: {
        margin: theme.spacing(1)
    }
}));

function Title(props) {
    return (
        <Typography component="h2" variant="h6" color="primary" gutterBottom style={{ marginTop: "10px" }}>
            {props.children}
        </Typography>
    );
}

function Admin_Dashboard() {
    const first_name="Hello";
    const last_name="Admin";
    const phone_number="45678934";
    
    const email="sdh@gmail.com";

    const classes = useStyles();

    return (
        <Admin_Sidebar>
            <Box component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }} className={classes.root}>
                    <Grid container spacing={3}>

                        <Grid item xs={12} md={8} lg={9}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 400,
                                    backgroundColor: "pink"
                                }}
                            >
                                <Typography style={{ margin: "30px 0px 0px 20px" }} variant="h6">
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
                                            <Typography variant="body1">Email:</Typography>
                                            <Typography variant="h8">{email || "-"}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Button color="primary" fullWidth size="large" className={classes.button}>
                                        Edit
                                    </Button>
                                </Paper>
                            </Paper>
                        </Grid>
                    </Grid>

                </Container>
            </Box>
        </Admin_Sidebar>
    )
}

export default Admin_Dashboard
