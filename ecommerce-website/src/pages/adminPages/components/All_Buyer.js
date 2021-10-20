import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Paper,Typography } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles'
import Admin_Sidebar from '../Admin_Sidebar'
import Buyer_Seller_Modal from './ViewOptions/Buyer_Seller_Modal';
import { Modal,Box } from '@material-ui/core';

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

// Generate Order Data
function createData(id, Image,name,email,phoneNo) {
  return {id,Image, name,email,phoneNo};
}

const all_buyer_data = [
  createData(
    1,
    "",
    'Popat Yadav',
    'pappu086@gmail.com',
    '8657645674',
  ),
  createData(
    2,
    "",
    'Rahul Yadav',
    'Rahul@gmail.com',
    '9655457674',
  ),
  createData(
    3,
    "",
    'Raj Singh',
    'rani@gmail.com',
    '8645645674',
  ),
  createData(
    4,
    "",
    'Tomar Yadav',
    'tuh086@edu.in',
    '8634985674',
  ),
  createData(
    5,
    "",
    'Keshar Patel',
    'keshar086@gmail.com',
    '8654445854',
  ),
  
];


function Title(props) {
    return (
      <Typography component="h2" variant="h6" color="primary" gutterBottom style={{margin:"10px,0px,20px,0px"}}>
        {props.children}
      </Typography>
    );
  }

export default function All_Buyer() {
  const classes = useStyles();
  const[open,setOpen]=React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // abhi me state define krke kr rha hu baad me sahi kr lenge <--- Proof
  const [Name,set_Name]=React.useState('');
  const [Email,set_Email]=React.useState('');
  const[PhoneNo,set_PhoneNo]=React.useState('');
  const[Image,set_Image]=React.useState('');

  function ViewModalHelper(buyer_name,buyer_email,buyer_phone,buyer_image)
  {
      handleOpen();
      set_Name(buyer_name);
      set_Email(buyer_email);
      set_PhoneNo(buyer_phone);
      set_Image(buyer_image);
  }

  if (all_buyer_data.length < 1) {
    return (
      <Typography className={classes.root} variant="h5">
        No Seller
      </Typography>
    );
  }

  return (
    <Admin_Sidebar activeItem="all_buyer">
      <Title>All Buyer</Title>
      <Paper className={classes.root}>
        <Table>
          <TableHead>
            <TableRow style={{background:"black"}}>
              
              <TableCell className={classes.header} align="center">
                ID
              </TableCell>
              <TableCell className={classes.header} align="center">
                Name
              </TableCell>
              <TableCell className={classes.header} align="center">
                Email
              </TableCell>
              <TableCell className={classes.header} align="center">
                Phone Number
              </TableCell>
              <TableCell className={classes.header} align="center">
                Action
              </TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {all_buyer_data.map(row => (
              <TableRow key={row.id}>
                  <TableCell align="center">{row.id}</TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.phoneNo}</TableCell>
                
                <TableCell Button align="center" onClick={()=>ViewModalHelper(row.name,row.email,row.phoneNo,row.Image)} style={{background:"green",color:"white",fontSize:"16px",fontWeight:"bold",cursor:"pointer"}}>View</TableCell>
              </TableRow>
            ))}

            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description">
              <Box sx={modal_Style}>
                  <Title >Buyer Information</Title>
                  <Buyer_Seller_Modal Image={Image} Name={Name} Email={Email} PhoneNo={PhoneNo} Role={"Buyer"}/>
              </Box>
            </Modal>
          </TableBody>
        </Table>
      </Paper>
    </Admin_Sidebar>
  );
}
