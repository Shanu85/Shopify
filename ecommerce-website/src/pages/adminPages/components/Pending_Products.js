import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Admin_Sidebar from '../Admin_Sidebar';
import Paper from '@material-ui/core/Paper';
import { makeStyles ,Typography,Box} from '@material-ui/core';
import { Modal } from '@material-ui/core';
import AllProduct_Modal from './ViewOptions/AllProduct_Modal';

function Title(props) {
    return (
      <Typography component="h2" variant="h6" color="primary" gutterBottom style={{marginTop:"10px"}}>
        {props.children}
      </Typography>
    );
  }

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

function createData(ID, ProductName,ProductImage1,ProductImage2,ProductProposal,SellerName,SellerPhoneNo,Stock, Price,description) {
  return { ID, ProductName,ProductImage1,ProductImage2,ProductProposal,SellerName,SellerPhoneNo,Stock, Price,description };
}

const rows = [
  createData(1, "Levis Shirt","","","","Rinku Singh","8456745679", 100, 1000,"Perfect for your on-the-go life, this shirt makes outfitting easier then ever. We cut this button-up to flatter your shape in the most subtle way, while still providing an easy fit and drape."),
  createData(2, "Adidas Shoes","","","","Faroz Kumar","7890456787",120, 2000,"Move with comfort fuelled by the plush cushioning and flexible design that adapts to the changing shape of your foot."),
  createData(3, "Puma TShirt","","","","Chanddni Yadav","8576345698", 170, 800,"Eye-catching graphic elements elevate this cotton crew neck tee from casual to ultra-cool."),
  createData(5, "Socks","","","","Rnhah Singh","8764567456",160, 490,"Pack of 3 solid ankle-length socks in grey, charcoal grey and black  each has a ribbed mouth and a flat toe seam"),
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

export default function Pending_Products() {
  const classes=useStyle();
  
  const[open,setOpen]=React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // abhi me state define krke kr rha hu baad me sahi kr lenge <--- Proof
  const [ProductName,set_ProductName]=React.useState('');
  const [SellerName,set_SellerName]=React.useState('');
  const[SellerPhoneNo,set_SellerPhoneNo]=React.useState('');
  const[ProductImage1,set_ProductImage1]=React.useState('');
  const[ProductImage2,set_ProductImage2]=React.useState('');
  const[ProductProposal,set_ProductProposal]=React.useState('');
  const [ProductStock,set_ProductStock]=React.useState('');
  const [ProductDes,set_ProductDes]=React.useState('');
  const[ProductPrice,set_ProductPrice]=React.useState('');


  function ViewModalHelper(ProductName,ProductImage1,ProductImage2,ProductProposal,SellerName,SellerPhoneNo,Stock, Price,description)
  {
      handleOpen();
      set_ProductName(ProductName);
      set_SellerName(SellerName);
      set_SellerPhoneNo(SellerPhoneNo);
      set_ProductImage1(ProductImage1);
      set_ProductImage2(ProductImage2);
      set_ProductProposal(ProductProposal);
      set_ProductStock(Stock);
      set_ProductDes(description);
      set_ProductPrice(Price);
  }

  return (
    <Admin_Sidebar activeItem="pending_products">
       
    <Title>Pending Products</Title>

    <Paper className={classes.root}>
      <Table>
        <TableHead>
          <TableRow style={{background:'black'}}>
            
            <TableCell className={classes.header} align="center">
              ID
            </TableCell>
            <TableCell className={classes.header} align="center">
              Product Name
            </TableCell>
            <TableCell className={classes.header} align="center">
              Seller Name
            </TableCell>
            <TableCell className={classes.header} align="center">
              Seller Phone No
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
          {rows.map(product => (
            <TableRow key={product.ID}>
              <TableCell align="center">{product.ID}</TableCell>
              <TableCell align="center">{product.ProductName}</TableCell>
              <TableCell align="center">{product.SellerName}</TableCell>
              <TableCell align="center">{product.SellerPhoneNo}</TableCell>
              <TableCell align="center">{product.Stock}</TableCell>
              <TableCell align="center">{product.Price}</TableCell>
              <TableCell Button align="center" onClick={()=>ViewModalHelper(product.ProductName,product.ProductImage1,product.ProductImage2,product.ProductProposal,product.SellerName,product.SellerPhoneNo,product.Stock,
                    product.Price,product.description)} style={{background:"green",color:"white",fontSize:"16px",fontWeight:"bold",cursor:"pointer"}}>View</TableCell>
            </TableRow>
          ))}
         
         <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description">
              <Box sx={modal_Style}>
                  <Title >Product Information</Title>
                    <AllProduct_Modal ProductName={ProductName} ProductImage1={ProductImage1} ProductImage2={ProductImage2} ProductProposal={ProductProposal} SellerName={SellerName} 
                    SellerPhoneNo={SellerPhoneNo} Stock={ProductStock} Price={ProductPrice} description={ProductDes} VisitingForProposal={true}/>
              </Box>
            </Modal>

        </TableBody>
      </Table>
    </Paper>
  </Admin_Sidebar>
  );
}