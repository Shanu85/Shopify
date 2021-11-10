import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import Seller_Sidebar from '../Seller_Sidebar'
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchSellerOrders } from "@actions/sellerActions/ProductActions";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: "10px",
    overflowX: "auto"
  },
  header: {
    color: "white",
    fontWeight: "bold"
  }
}));

function Title(props) {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom style={{ marginTop: "10px" }}>
      {props.children}
    </Typography>
  );
}

function parseTitle(title) {
  title = title + "";
  return title.substr(0, title.lastIndexOf(' '));
}

export default function Orders() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const sellerOrders = useSelector(state => state.seller.sellerOrders);

  useEffect(() => {
    dispatch(fetchSellerOrders());
  }, [dispatch]);

  return (
    <Seller_Sidebar activeItem="seller_orders">
      <Title>Recent Orders</Title>
      <Paper className={classes.root}>
        <Table>
          <TableHead>
            <TableRow style={{ background: "black" }}>

              <TableCell className={classes.header} align="center">
                Date
              </TableCell>
              <TableCell className={classes.header} align="center">
                Product Name
              </TableCell>
              <TableCell className={classes.header} align="center">
                Quantity
              </TableCell>
              <TableCell className={classes.header} align="center">
                Total Price
              </TableCell>
              <TableCell className={classes.header} align="center">
                Payment Mode
              </TableCell>
              <TableCell className={classes.header} align="center">
                Ship To
              </TableCell>

            </TableRow>
          </TableHead>
          <TableBody>

            {sellerOrders.map(sellerOrder => (
              <TableRow>
                <TableCell align="center">{sellerOrder.date.split(' ')[0]}</TableCell>
                <TableCell align="center">{parseTitle(sellerOrder.title)}</TableCell>
                <TableCell align="center">{sellerOrder.quantity}</TableCell>
                <TableCell align="center">₹ {sellerOrder.total_price}</TableCell>
                <TableCell align="center">{sellerOrder.payment_mode}</TableCell>
                <TableCell align="center">{sellerOrder.location}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Seller_Sidebar>
  );
}
