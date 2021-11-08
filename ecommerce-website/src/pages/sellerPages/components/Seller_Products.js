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
import SellerProductView from './ManageProduct/SellerProductView';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchSellerProducts } from "@actions/sellerActions/ProductActions";
import { createSellerProduct } from "@actions/sellerActions/ProductActions";
import { updateSellerProduct } from "@actions/sellerActions/ProductActions";
import { deleteSellerProduct } from "@actions/sellerActions/ProductActions";


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

export default function Seller_Products() {
  const classes = useStyle();
  const dispatch = useDispatch();
  const sellerProducts = useSelector(state => state.seller.sellerProducts);
  useEffect(() => {
    dispatch(fetchSellerProducts());
  }, [dispatch]);

  const [addOpen, setAddOpen] = React.useState(false);
  const handleAddOpen = () => setAddOpen(true);
  const addClose = (newSellerProduct) => {
    dispatch(createSellerProduct(newSellerProduct, setAddOpen));
  }
  const forceAddClose = () => {
    setAddOpen(false);
  }

  const [Editopen, setEditopen] = React.useState(false);
  const handleEditopen = () => setEditopen(true);
  const handleEditclose = () => setEditopen(false);
  const [editSellerProduct, set_edit_sellerProduct] = React.useState(null);
  function EditHelper(sellerProduct) {
    if (sellerProduct['status'] === true) {
      handleEditopen();
      set_edit_sellerProduct(sellerProduct);
    }
  };
  const editClose = (updatedSellerProduct) => {
    dispatch(updateSellerProduct(updatedSellerProduct, updatedSellerProduct['id']));
    handleEditclose();
  }


  const [viewSellerProduct, setViewSellerProduct] = React.useState(null);
  const[viewOpen,setViewOpen]=React.useState(false);
  const handleViewOpen = () => setViewOpen(true);
  const handleViewClose = () => setViewOpen(false);
  function ViewHelper(sellerProduct) {
    setViewSellerProduct(sellerProduct);
    handleViewOpen();
  };
  const handleRemove = (sellerProduct) => {    
    dispatch(deleteSellerProduct(sellerProduct['id']));
    handleViewClose();
  }

  function parseTitle(title) {
    title = title + "";
    return title.substr(0, title.lastIndexOf(' '));
  }


  return (
    <Seller_Sidebar activeItem="seller_product">
      <Box sx={{ flexGrow: 1, marginTop: "20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <Title>Products</Title>
          </Grid>
          <Grid item xs={3}>
            <Button onClick={handleAddOpen} style={{ background: "green", color: "white" }}>Add Product</Button>
            <Modal
              open={addOpen}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={modal_Style}>
                <Title>Add Product</Title>
                <AddProductFrom onClose={addClose} forceClose={forceAddClose}/>
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
                SNo.
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
                View
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
                <TableCell align="center" style={{ alignItems: "center" }}>{parseTitle(sellerProduct.title)}</TableCell>
                <TableCell align="center">{sellerProduct['sale_count']}</TableCell>
                <TableCell align="center">{sellerProduct['price']}</TableCell>

                <TableCell Button align="center" onClick={()=>ViewHelper(sellerProduct)} style={{background:"green",color:"white",fontSize:"16px",fontWeight:"bold",cursor:"pointer"}}>View</TableCell>

                {sellerProduct['status'] === true ? <TableCell align="center" style={{ color: "green", fontWeight: "bold" }}>{"Approved"}</TableCell> :
                  <TableCell align="center" style={{ color: "red", fontWeight: "bold" }}>{"Pending"}</TableCell>
                }
                {
                  sellerProduct['status'] === true ? <TableCell Button align="center" onClick={() => EditHelper(sellerProduct)} style={{ background: "red", color: "white", fontSize: "16px", fontWeight: "bold", cursor: "pointer" }}>Edit</TableCell>
                    : <TableCell></TableCell>
                }

              </TableRow>
            ))}

            <Modal open={viewOpen} onClose={handleViewClose} aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description">
              <Box sx={modal_Style}>
                  <Title >Product Information</Title>
                  <SellerProductView sellerProduct={viewSellerProduct} handleRemove={handleRemove}/>
              </Box>
            </Modal>


            <Modal open={Editopen} onClose={handleEditclose} aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description">
              <Box sx={modal_Style}>
                <Title>Edit</Title>
                <EditProductForm onClose={editClose} sellerProduct={editSellerProduct}/>
              </Box>
            </Modal>
          </TableBody>
        </Table>
      </Paper>
    </Seller_Sidebar>
  );
}