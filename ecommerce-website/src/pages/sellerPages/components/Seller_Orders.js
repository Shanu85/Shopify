import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Paper,Typography } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles'
import Seller_Sidebar from '../Seller_Sidebar'

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: "10px",
    overflowX: "auto"
  },
  header: {
    color: "white",
    fontWeight:"bold"
  }
}));

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const total_orders = [
  createData(
    0,
    '16 Mar, 2019',
    'Elvis Presley',
    'Tupelo, MS',
    'VISA ⠀•••• 3719',
    312.44,
  ),
  createData(
    1,
    '16 Mar, 2019',
    'Paul McCartney',
    'London, UK',
    'VISA ⠀•••• 2574',
    866.99,
  ),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
  createData(
    3,
    '16 Mar, 2019',
    'Michael Jackson',
    'Gary, IN',
    'AMEX ⠀•••• 2000',
    654.39,
  ),
  createData(
    4,
    '15 Mar, 2019',
    'Bruce Springsteen',
    'Long Branch, NJ',
    'VISA ⠀•••• 5919',
    212.79,
  ),
];


function Title(props) {
    return (
      <Typography component="h2" variant="h6" color="primary" gutterBottom style={{marginTop:"10px"}}>
        {props.children}
      </Typography>
    );
  }

export default function Orders() {
  const classes = useStyles();

  if (total_orders.length < 1) {
    return (
      <Typography className={classes.root} variant="h5">
        No order
      </Typography>
    );
  }

  return (
    <Seller_Sidebar activeItem="seller_orders">
      <Title>Recent Orders</Title>
      <Paper className={classes.root}>
        <Table>
          <TableHead>
            <TableRow style={{background:"black"}}>
              
              <TableCell className={classes.header} align="center">
                Date
              </TableCell>
              <TableCell className={classes.header} align="center">
                Name
              </TableCell>
              <TableCell className={classes.header} align="center">
                Ship to
              </TableCell>
              <TableCell className={classes.header} align="center">
                Payment Method
              </TableCell>
              <TableCell className={classes.header} align="center">
                Sale Amount
              </TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {total_orders.map(order => (
              <TableRow key={order.id}>
                <TableCell align="center">{order.date}</TableCell>
                <TableCell align="center">{order.name}</TableCell>
                <TableCell align="center">{order.shipTo}</TableCell>
                <TableCell align="center">{order.paymentMethod}</TableCell>
                <TableCell align="center">{`$${order.amount}`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Seller_Sidebar>
  );
}
