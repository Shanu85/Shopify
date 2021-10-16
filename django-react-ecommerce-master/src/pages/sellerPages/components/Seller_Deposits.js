import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';

function Title(props) {
    return (
      <Typography component="h2" variant="h6" color="primary" gutterBottom style={{marginTop:"10px"}}>
        {props.children}
      </Typography>
    );
  }

const getCurrentDate=()=>{

    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    var ans= (date + '-' + month + '-' + year);
    console.log(ans);
    return ans.toString;
}

export default function Seller_Deposits() {
    
  return (
    <Grid style={{margin:"30px"}}>
      <Title>Recent Deposits</Title>
      <Typography component="p" variant="h6">
        $3,024.00
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {getCurrentDate}
      </Typography>
      
    </Grid>
  );
}
