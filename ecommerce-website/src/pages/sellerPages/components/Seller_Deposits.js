import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';

function Title(props) {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom style={{ marginTop: "10px" }}>
      {props.children}
    </Typography>
  );
}


export default function Seller_Deposits({pay_balance}) {
  const [currDate, setCurrDate] = useState("- - -");

  useEffect(() => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    setCurrDate(date + '-' + month + '-' + year);
  }, [setCurrDate]);

  return (
    <Grid style={{ margin: "30px" }}>
      <Title>Recent Deposits</Title>
      <Typography component="p" variant="h6">
        ₹ {pay_balance}
      </Typography>
      <Typography color="text.secondary" sx={{flex: 1}} >
        {currDate}
      </Typography>

    </Grid>
  );
}
