import React from "react";
import {createTheme} from "@material-ui/core/styles";

import Box from '@material-ui/core/Box'

// import { ThemeProvider } from "@emotion/react";
import { ThemeProvider } from "@material-ui/styles";
import { AppBar, CssBaseline, Toolbar, Typography } from "@material-ui/core";

const mdTheme = createTheme();

function Seller_header() {
    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline/>
                <AppBar position="absolute">
                    <Toolbar sx={{pr:"24px"}}>
                        <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                            Seller Dashboard
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
            
        </ThemeProvider>
    )
}

export default Seller_header
