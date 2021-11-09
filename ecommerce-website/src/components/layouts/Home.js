import { Box, Button, Grid, Typography } from '@material-ui/core';
import { Facebook, Instagram, Twitter } from "@material-ui/icons";
import React from "react";
import { useSelector } from 'react-redux';
import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";
import HomeModel from "./images/HomeModel.jpg";

const Home = () => {

  const SocialContainer = styled.div`
  display: flex;
`;

  const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

  const { isAuthenticated, user } = useSelector(state => state.auth);

  return (
    <div>
      <Grid container style={{ margin: '40px 0px 0px' }}>
        <Grid item xs={6}>
          <Box
            component="img"
            sx={{
              padding: '0px 0px 0px 200px',
              height: '590px',
              width: 'auto'
            }}
            alt="Home Model"
            src={HomeModel}
          />
        </Grid>
        <Grid item xs={6}>
          <div style={{ padding: '250px 200px 0px 0px' }}>
            <Typography variant="h2">Find it, love it, buy it.</Typography>

            {isAuthenticated && user.user_type === "Admin" ?
              <Button component={RouterLink} to={"/admin/"} onClick={()=>window.location.reload(false)} color="primary" variant="contained" style={{ margin: '50px' }}>
                GO TO ADMIN PROFILE
              </Button>
              :
              isAuthenticated && user.user_type === "Seller" ?
                <Button component={RouterLink} to="/seller_dashboard" color="primary" variant="contained" style={{ margin: '50px' }}>
                  GO TO YOUR PROFILE
                </Button>
                :
                <Button component={RouterLink} to="/products" color="primary" variant="contained" style={{ margin: '50px' }}>
                  SHOP NOW
                </Button>}
          </div>
        </Grid>

        <Grid item xs={12} style={{ background: 'silver', margin: '40px 0px 0px', padding: '10px 45%' }}>
          <SocialContainer>
            <SocialIcon color="3B5999">
              <Facebook />
            </SocialIcon>
            <SocialIcon color="E4405F">
              <Instagram />
            </SocialIcon>
            <SocialIcon color="55ACEE">
              <Twitter />
            </SocialIcon>

          </SocialContainer>

          <div style={{ margin: '10px 0px 0px', padding: '0px 15px' }}>
            © 2021 Shopify
          </div>
        </Grid>

      </Grid>

    </div>
  )
}

export default Home;