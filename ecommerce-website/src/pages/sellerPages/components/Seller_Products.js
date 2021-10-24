import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Avatar, Grid } from '@material-ui/core';
import Seller_Sidebar from '../Seller_Sidebar';
import Paper from '@material-ui/core/Paper';
import { makeStyles, Typography, Box } from '@material-ui/core';
import { Image } from '@material-ui/icons';
import { Button, Modal } from "@material-ui/core";
import AddProductFrom from './ManageProduct/AddProductFrom';
import EditProductForm from './ManageProduct/EditProductForm';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchSellerProducts } from "@actions/sellerActions/ProductActions";
import { createSellerProduct } from "@actions/sellerActions/ProductActions";

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
    <Typography component="h2" variant="h6" color="primary" gutterBottom style={{ marginTop: "10px" }}>
      {props.children}
    </Typography>
  );
}

const useStyle = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(1)
  },
  detail: {
    padding: theme.spacing(1)
  },
  header: {
    color: "white",
    fontWeight: "bold"
  }
}));

function ProductDetails(Product_name) {
  return (
    <div style={{ display: "flex", alignItems: "center", margin: "auto" }}>
      <Avatar sx={{ width: 40, height: 40 }}>
        <Image />
      </Avatar>
      <span style={{ marginLeft: "20px" }}>{Product_name}</span>
    </div>
  )
}

export default function Seller_Products() {
  const dispatch = useDispatch();
  const sellerProducts = useSelector(state => state.seller.sellerProducts);

  useEffect(() => {
    dispatch(fetchSellerProducts());
  }, []);

  const classes = useStyle();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = (newSellerProduct) => {
    dispatch(createSellerProduct(newSellerProduct));
    setOpen(false);
    dispatch(fetchSellerProducts());
  }

  const forceClose = () => {
    setOpen(false);
  }

  const [Editopen, setEditopen] = React.useState(false);
  const handleEditopen = () => setEditopen(true);
  const handleEditclose = () => setEditopen(false);


  const [model_productStock, set_model_productStock] = React.useState('');
  const [model_productPrice, set_model_productPrice] = React.useState('');


  function EditHelper(productStock, productPrice, productStatus) {
    if (productStatus === true) {
      handleEditopen();

      set_model_productStock(productStock);
      set_model_productPrice(productPrice);

    }
  };

  return (
    <Seller_Sidebar activeItem="seller_product">
      <Box sx={{ flexGrow: 1, marginTop: "20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <Title>Products</Title>
          </Grid>
          <Grid item xs={3}>
            <Button onClick={handleOpen} style={{ background: "green", color: "white" }}>Add Product</Button>
            <Modal
              open={open}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={modal_Style}>
                <Title>Add Product</Title>
                <AddProductFrom onClose={handleClose} forceClose={forceClose}/>
              </Box>
            </Modal>
          </Grid>
        </Grid>
      </Box>

      <Paper className={classes.root}>
        <Table>
          <TableHead>
            <TableRow style={{ background: 'black' }}>

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
                Status
              </TableCell>
              <TableCell className={classes.header} align="center">
                Action
              </TableCell>

            </TableRow>
          </TableHead>
          <TableBody>

            {sellerProducts.map((sellerProduct, id) => (
              <TableRow key={id + 1}>
                <TableCell align="center">{id + 1}</TableCell>
                <TableCell align="center" style={{ alignItems: "center" }}>{sellerProduct['title']}</TableCell>
                <TableCell align="center">{sellerProduct['sale_count']}</TableCell>
                <TableCell align="center">{sellerProduct['price']}</TableCell>
                {sellerProduct['status'] === true ? <TableCell align="center" style={{ color: "green", fontWeight: "bold" }}>{"Approved"}</TableCell> :
                  <TableCell align="center" style={{ color: "red", fontWeight: "bold" }}>{"Pending"}</TableCell>
                }
                {
                  sellerProduct['status'] === true ? <TableCell Button align="center" onClick={() => EditHelper(sellerProduct['sale_count'],sellerProduct['price'], sellerProduct['status'])} style={{ background: "red", color: "white", fontSize: "16px", fontWeight: "bold", cursor: "pointer" }}>Edit</TableCell>
                    : <TableCell></TableCell>
                }

              </TableRow>
            ))}
            <Modal open={Editopen} onClose={handleEditclose} aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description">
              <Box sx={modal_Style}>
                <Title>Edit</Title>
                <EditProductForm productStock={model_productStock} productPrice={model_productPrice} />
              </Box>
            </Modal>
          </TableBody>
        </Table>
      </Paper>
    </Seller_Sidebar>
  );
}