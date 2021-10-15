import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Button, Grid } from '@material-ui/core';
import Seller_Sidebar from '../Seller_Sidebar';
import Paper from '@material-ui/core/Paper';
import { makeStyles ,Typography,Box} from '@material-ui/core';

function Title(props) {
    return (
      <Typography component="h2" variant="h6" color="primary" gutterBottom style={{marginTop:"10px"}}>
        {props.children}
      </Typography>
    );
  }

function createData(ID, ProductName, Stock, Price, Action) {
  return { ID, ProductName, Stock, Price, Action };
}

const rows = [
  createData(1, "Levis Shirt", 100, 1000, <Button variant="contained" type="error">Edit</Button>),
  createData(2, "Adidas Shoes", 120, 2000, <Button variant="contained" type="error">Edit</Button>),
  createData(3, "Puma TShirt", 170, 800, <Button variant="contained" type="error">Edit</Button>),
  createData(4, "Trousers", 130, 670, <Button variant="contained" type="error">Edit</Button>),
  createData(5, "Socks", 160, 490, <Button variant="contained" type="error">Edit</Button>),
];

const useStyle=makeStyles(theme => ({
    root: {
      marginTop: theme.spacing(1)
    },
    detail: {
      padding: theme.spacing(1)
    }
  }));


export default function Seller_Products() {
    const classes=useStyle();

  return (
    <Seller_Sidebar activeItem="seller_product">
       <Box sx={{ flexGrow: 1,marginTop:"20px" }}>
          <Grid container spacing={2}>
              <Grid item xs={9}>
                <Title>Products</Title>
              </Grid>
              <Grid item xs={3}>
                <Button variant="contained" style={{background:"green",color:"white"}}>Add Product</Button>
              </Grid>
          </Grid>
       </Box>
    
    <Paper className={classes.root}>
      <Table>
        <TableHead>
          <TableRow>
            
            <TableCell className={classes.header} align="center">
              ID
            </TableCell>
            <TableCell className={classes.header} align="center">
              Product Name
            </TableCell>
            <TableCell className={classes.header} align="center">
              Stock 
            </TableCell>
            <TableCell className={classes.header} align="center">
              Price
            </TableCell>
            <TableCell className={classes.header} align="center">
              Action
            </TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(order => (
            <TableRow key={order.id}>
              <TableCell align="center">{order.ID}</TableCell>
              <TableCell align="center">{order.ProductName}</TableCell>
              <TableCell align="center">{order.Stock}</TableCell>
              <TableCell align="center">{order.Price}</TableCell>
              <TableCell align="center">{order.Action}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  </Seller_Sidebar>
  );
}
