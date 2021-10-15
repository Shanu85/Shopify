import React from 'react'
import Seller_Sidebar from '../Seller_Sidebar'
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Seller_Deposits from './Seller_Deposits';
import Typography from '@material-ui/core/Typography';

function Seller_Dashboard() {
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
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                {/* Chart */}
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
                        <Typography>Fake Text</Typography>
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
