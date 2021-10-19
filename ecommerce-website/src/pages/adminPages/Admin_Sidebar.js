import React from 'react'
import ListItemLink from '../../pages/profilePages/Sidebar/ListItemLink'
import { ExpansionPanel, Grid, makeStyles } from '@material-ui/core'
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ShopingCartIcon from "@material-ui/icons/ShoppingCartOutlined";
import ChangePasswordIcon from "@material-ui/icons/LockOutlined";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import List from '@material-ui/core/List';
import { Dashboard, Group, People,ThumbUp } from '@material-ui/icons';


const useStyle=makeStyles(theme => ({
    root: {
      marginTop: theme.spacing(1)
    },
    detail: {
      padding: theme.spacing(1)
    }
  }));

const Admin_Sidebar=({ activeItem, children }) =>{
    const classes=useStyle();

    return (
        
            <Grid container spacing={3}>
                <Grid item md="auto" xs={12} className={classes.root}>
                    <ExpansionPanel>
                    <List style={{ width: "100%" }}>
                        <ListItemLink selected={activeItem === "admin_dashboard"} to="/admin_dashboard">
                        <ListItemIcon>
                            <Dashboard />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                        </ListItemLink>
                        
                        <ListItemLink selected={activeItem === "all_seller"} to='/All_Seller'>
                        <ListItemIcon>
                            <People />
                        </ListItemIcon>
                        <ListItemText primary="All Seller" />
                        </ListItemLink>

                        <ListItemLink selected={activeItem === "all_buyer"} to='/All_Buyer'>
                        <ListItemIcon>
                            <Group />
                        </ListItemIcon>
                        <ListItemText primary="All Buyer" />
                        </ListItemLink>

                        <ListItemLink selected={activeItem === "all_product"} to='/All_Products'>
                        <ListItemIcon>
                            <ShopingCartIcon color="action" />
                        </ListItemIcon>
                        <ListItemText primary="All Products" />
                        </ListItemLink>

                        <ListItemLink selected={activeItem === "pending_products"} to='/Pending_Products'>
                        <ListItemIcon>
                            <ThumbUp/>
                        </ListItemIcon>
                        <ListItemText primary="Pending Products" />
                        </ListItemLink>


                        <ListItemLink to="/admin-change-password">
                        <ListItemIcon>
                            <ChangePasswordIcon />
                        </ListItemIcon>
                        <ListItemText primary="Change password" />
                        </ListItemLink>

                        <ListItemLink to="/admin-logout">
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                        </ListItemLink>
                    </List>
                    </ExpansionPanel>
                    
                </Grid>
                <Grid item md xs={12}>
                    {children}
                </Grid>
            </Grid>
       
        
    )
}

export default Admin_Sidebar
