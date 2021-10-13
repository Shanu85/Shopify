import {
  Facebook,
  Instagram,
  Twitter,
} from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "./responsive";
import React from "react";

const Container = styled.div`
  
  bottom: 0;
  display: flex;
  background-color:silver;
  position:sticky;
  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

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

const Center = styled.div`
  flex: 1;
  padding: 10px;
  ${mobile({ display: "none" })}
`;

const Footer = () => {
  return (
    <Container position="static">
      <Left>
        
      </Left>
      <Center>

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
      </Center>
      
    </Container>
  );
};

export default Footer;
