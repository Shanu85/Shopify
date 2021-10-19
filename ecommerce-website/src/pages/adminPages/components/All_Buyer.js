import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Paper,Typography } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles'
import Admin_Sidebar from '../Admin_Sidebar'

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
function createData(id, name,email,phoneNo) {
  return {id, name,email,phoneNo};
}

const all_buyer_data = [
  createData(
    1,
    'Popat Yadav',
    'pappu086@gmail.com',
    '8657645674',
  ),
  createData(
    2,
    'Rahul Yadav',
    'Rahul@gmail.com',
    '9655457674',
  ),
  createData(
    3,
    'Raj Singh',
    'rani@gmail.com',
    '8645645674',
  ),
  createData(
    4,
    'Tomar Yadav',
    'tuh086@edu.in',
    '8634985674',
  ),
  createData(
    5,
    'Keshar Patel',
    'keshar086@gmail.com',
    '8654445854',
  ),
  
];


function Title(props) {
    return (
      <Typography component="h2" variant="h6" color="primary" gutterBottom style={{marginTop:"10px"}}>
        {props.children}
      </Typography>
    );
  }

export default function All_Buyer() {
  const classes = useStyles();

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
                
                <TableCell Button align="center" style={{background:"green",color:"white",fontSize:"16px",fontWeight:"bold",cursor:"pointer"}}>View</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Admin_Sidebar>
  );
}
