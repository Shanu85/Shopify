import {
    Button,
    CardContent,
    CardHeader,
    Box,
    TextField
  } from "@material-ui/core";
  import Card from "@material-ui/core/Card";
  import React from "react";
  import { useEffect, useState } from "react";
  import { useCallback } from "react";
  
  
  function Cod() {
    const [typedCaptcha, setTypeCaptcha] = useState("");
    const [data, setData] = useState("");
  
    function RandomIndex(length) {
      return Math.floor(Math.random() * length);
    }
  
    const getCaptcha = useCallback(() => {
      var captcanvas = document.getElementById("captchacanvas");
      var pen = captcanvas.getContext("2d");
      var generatedCaptcha = Math.random.toString(36).substring(2, 8);
  
      pen.font = "30px Georgia";
      pen.fillStyle = "#c5c9c6";
      pen.fillRect(0, 0, 400, 400);
      pen.fillStyle = "red";
  
      var maxlength = generatedCaptcha.length;
      var index1 = RandomIndex(maxlength);
      var val1 = RandomIndex(10);
      var val2 = RandomIndex(10);
  
      generatedCaptcha =
        generatedCaptcha.substring(0, index1 - 1) +
        val1 +
        generatedCaptcha[index1].toUpperCase() +
        generatedCaptcha.substring(index1 + 1, maxlength) +
        val2;
  
      setData(generatedCaptcha);
  
      console.log(data);
      pen.fillText(generatedCaptcha, 40, 40);
    },[]);
  
    function PlaceOrder() {
      console.log(typedCaptcha);
      console.log(data);
      if (typedCaptcha === data) {
        alert("Correct");
      } else {
        alert("Incorrect");
      }
      getCaptcha();
      setTypeCaptcha("");
      setData("");
    }
  
    useEffect(() => {
      getCaptcha();
    }, [getCaptcha]);
  
    return (
      <Card style={{ border: "none", boxShadow: "none" }}>
        <CardHeader title="Pay on Delivery(Cash/Card/UPI)" />
        <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
            <canvas
                    id="captchacanvas"
                    width={220}
                    height={60}
                    style={{ border: "2px solid grey" }}
                ></canvas>
                
                <Button variant="text" onClick={getCaptcha} style={{color:"red",justifyContent:"center",marginLeft:"20px"}}>
                Change Captcha
                </Button>
        </Box>
            
        </CardContent>
        <CardContent>
          <TextField
            helperText="Please enter above captcha"
            id="captchaInput"
            
            label="Captcha"
            
          />
        </CardContent>
        <CardContent>
          <Button variant="contained" style={{background:"green",color:"white"}} onClick={PlaceOrder}>
            Place Order
          </Button>
        </CardContent>
      </Card>
    );
  }
  
  export default Cod;
  