import React from 'react'
import ListItemLink from '@pages/profilePages/Sidebar/ListItemLink'
import { ExpansionPanel, Grid, makeStyles } from '@material-ui/core'
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ShopingCartIcon from "@material-ui/icons/ShoppingCartOutlined";
import ChangePasswordIcon from "@material-ui/icons/LockOutlined";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import List from '@material-ui/core/List';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import { Dashboard } from '@material-ui/icons';
import { useDispatch } from "react-redux";
import { fetchSellerProducts } from "@actions/sellerActions/ProductActions";

const useStyle=makeStyles(theme => ({
    root: {
      marginTop: theme.spacing(1)
    },
    detail: {
      padding: theme.spacing(1)
    }
  }));

const Seller_Sidebar=({ activeItem, children }) =>{
    const classes=useStyle();
    const dispatch = useDispatch();

    return (
        
            <Grid container spacing={3}>
                <Grid item md="auto" xs={12} className={classes.root}>
                    <ExpansionPanel>
                    <List style={{ width: "100%" }}>
                        <ListItemLink selected={activeItem === "seller_dashboard"} to="/seller_dashboard">
                        <ListItemIcon>
                            <Dashboard />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                        </ListItemLink>
                        
                        <ListItemLink selected={activeItem === "seller_product"} to="/seller_product">
                        <ListItemIcon>
                            <ShopingCartIcon color="action" />
                        </ListItemIcon>
                        <ListItemText primary="Products" />
                        </ListItemLink>

                        <ListItemLink selected={activeItem === "seller_orders"} to="/seller_Order">
                        <ListItemIcon>
                            <ShoppingCart />
                        </ListItemIcon>
                        <ListItemText primary="Orders" />
                        </ListItemLink>


                        <ListItemLink to="/seller-change-password">
                        <ListItemIcon>
                            <ChangePasswordIcon />
                        </ListItemIcon>
                        <ListItemText primary="Change password" />
                        </ListItemLink>

                        <ListItemLink to="/seller-logout">
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

export default Seller_Sidebar
