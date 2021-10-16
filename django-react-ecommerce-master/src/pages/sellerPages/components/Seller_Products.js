import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Avatar, Grid } from '@material-ui/core';
import Seller_Sidebar from '../Seller_Sidebar';
import Paper from '@material-ui/core/Paper';
import { makeStyles ,Typography,Box} from '@material-ui/core';
import { Image } from '@material-ui/icons';
import {Button,Modal} from "@material-ui/core";
import AddProductFrom from './ManageProduct/AddProductFrom';

const modal_Style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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
  createData(1, ProductDetails("Levis Shirt"), 100, 1000, <Button variant="contained" type="error">Edit</Button>),
  createData(2, ProductDetails("Adidas Shoes"), 120, 2000, <Button variant="contained" type="error">Edit</Button>),
  createData(3, ProductDetails("Puma TShirt"), 170, 800, <Button variant="contained" type="error">Edit</Button>),
  createData(4, ProductDetails("Trousers"), 130, 670, <Button variant="contained" type="error">Edit</Button>),
  createData(5, ProductDetails("Socks"), 160, 490, <Button variant="contained" type="error">Edit</Button>),
];

const useStyle=makeStyles(theme => ({
    root: {
      marginTop: theme.spacing(1)
    },
    detail: {
      padding: theme.spacing(1)
    }
  }));

function ProductDetails(Product_name){
  return(
    <div style={{display:"flex",alignItems:"center",margin:"auto"}}>
      <Avatar sx={{width:40,height:40}}>
        <Image/>
      </Avatar>
      <span style={{marginLeft:"20px"}}>{Product_name}</span>
    </div>
  )
}



export default function Seller_Products() {
    const classes=useStyle();
    const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  return (
    <Seller_Sidebar activeItem="seller_product">
       <Box sx={{ flexGrow: 1,marginTop:"20px" }}>
          <Grid container spacing={2}>
              <Grid item xs={9}>
                <Title>Products</Title>
              </Grid>
              <Grid item xs={3}>
                <Button onClick={handleOpen} style={{background:"green",color:"white"}}>Add Product</Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={modal_Style}>
                    <Title>Add Product</Title>
                    <AddProductFrom/>
                  </Box>
                </Modal>
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
              Product
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
              <TableCell align="center" style={{alignItems:"center"}}>{order.ProductName}</TableCell>
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
