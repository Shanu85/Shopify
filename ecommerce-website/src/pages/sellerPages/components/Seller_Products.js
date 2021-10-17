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
import { Edit, Image } from '@material-ui/icons';
import {Button,Modal} from "@material-ui/core";
import AddProductFrom from './ManageProduct/AddProductFrom';
import EditProductForm from './ManageProduct/EditProductForm';

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

function createData(ID, ProductName, Stock, Price,Status,description) {
  return { ID, ProductName, Stock, Price,Status,description};
}

const rows = [
  createData(1, ProductDetails("Levis Shirt"), 100, 1000,"Not Approved","Perfect for your on-the-go life, this shirt makes outfitting easier then ever. We cut this button-up to flatter your shape in the most subtle way, while still providing an easy fit and drape."),
  createData(2, ProductDetails("Adidas Shoes"), 120, 2000,"Not Approved","Move with comfort fuelled by the plush cushioning and flexible design that adapts to the changing shape of your foot."),
  createData(3, ProductDetails("Puma TShirt"), 170, 800,"Approved","Eye-catching graphic elements elevate this cotton crew neck tee from casual to ultra-cool."),
  createData(4, ProductDetails("Trousers"), 130, 670,"Not Approved","Grey solid mid-rise chinos, has a button closure and a zip fly, has a waistband with belt loops, five pockets"),
  createData(5, ProductDetails("Socks"), 160, 490,"Approved","Pack of 3 solid ankle-length socks in grey, charcoal grey and black  each has a ribbed mouth and a flat toe seam"),
];

const useStyle=makeStyles(theme => ({
    root: {
      marginTop: theme.spacing(1)
    },
    detail: {
      padding: theme.spacing(1)
    },
    header:{
      color:"white",
      fontWeight:"bold"
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

// function helper(productName,productDes,productStock,productPrice)
// {
//   alert(productPrice);
//   <EditProductForm productName={productName} productDes ={productDes} productStock={productStock} productPrice={productPrice}/>
// }

export default function Seller_Products() {
  const classes=useStyle();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const [Editopen,setEditopen]=React.useState(false);
  const handleEditopen=()=>setEditopen(true);
  const handleEditclose=()=>setEditopen(false);
  
  
  const [model_productStock,set_model_productStock]=React.useState('');
  const [model_productPrice,set_model_productPrice]=React.useState('');
  

  function EditHelper(productStock,productPrice,productStatus)
  {
    if(productStatus==="Approved"){
      handleEditopen();
    
      set_model_productStock(productStock);
      set_model_productPrice(productPrice);
      
    }
  };

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
          <TableRow style={{background:'black'}}>
            
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
          {rows.map(order => (
            <TableRow key={order.ID}>
              <TableCell align="center">{order.ID}</TableCell>
              <TableCell align="center" style={{alignItems:"center"}}>{order.ProductName}</TableCell>
              <TableCell align="center">{order.Stock}</TableCell>
              <TableCell align="center">{order.Price}</TableCell>
              {order.Status==="Approved"? <TableCell align="center" style={{color:"green",fontWeight:"bold"}}>{order.Status}</TableCell> :
                  <TableCell align="center" style={{color:"red",fontWeight:"bold"}}>{order.Status}</TableCell> 
              }
              {
                order.Status==="Approved"? <TableCell Button align="center" onClick={()=>EditHelper(order.Stock,order.Price,order.Status)} style={{background:"red",color:"white",fontSize:"16px",fontWeight:"bold",cursor:"pointer"}}>Edit</TableCell>
                : <TableCell></TableCell>
              }
              
            </TableRow>
          ))}
          <Modal open={Editopen} onClose={handleEditclose} aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description">
                <Box sx={modal_Style}>
                  <Title>Edit</Title>
                    <EditProductForm productStock={model_productStock} productPrice={model_productPrice}/>
                </Box>
          </Modal>
        </TableBody>
      </Table>
    </Paper>
  </Seller_Sidebar>
  );
}