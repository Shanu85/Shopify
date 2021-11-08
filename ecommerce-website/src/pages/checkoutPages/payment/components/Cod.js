import { Box, Button, CardContent, CardHeader, TextField } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import React from "react";
import { useEffect, useState } from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "@actions/profileActions/orderActions";
import { fetchCart } from "@actions/cartActions";
import { fetchAddresses } from "@actions/profileActions/AddressActions";


function Cod({ history }) {
  const {
    cart,
    ui: { loadingUI },
    profile: { addresses }
  } = useSelector(state => state);
  const address = addresses[0];
  const dispatch = useDispatch();

  const handleClick = (payment_mode) => {
    if (typedCaptcha === data) {
      const order = {
        receiver: {
          full_name: address.receiver_full_name,
          phone_number: address.receiver_phone_number,
          address: `${address.state} ${address.city} ${address.postal_address} ${address.postal_code}`
        },
        payment_mode: payment_mode
      };
      dispatch(createOrder(order, history));
    } else {
      alert("Incorrect");
      getCaptcha();
    }
  };

  useEffect(() => {
    dispatch(fetchCart());
    dispatch(fetchAddresses());
  }, [dispatch]);

  const [typedCaptcha, setTypeCaptcha] = useState("");
  const [data, setData] = useState("");

  const handleTypedCaptchaChange = (event) => {
    setTypeCaptcha(event.target.value);
  };

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

    // console.log(data);
    pen.fillText(generatedCaptcha, 40, 40);
  }, []);

  useEffect(() => {
    getCaptcha();
  }, []);

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

          <Button variant="text" onClick={() => getCaptcha()} style={{ color: "red", justifyContent: "center", marginLeft: "20px" }}>
            Change Captcha
          </Button>
        </Box>

      </CardContent>
      <CardContent>
        <TextField
          helperText="Please enter above captcha"
          id="captchaInput"
          label="Captcha"
          value={typedCaptcha}
          onChange={handleTypedCaptchaChange}
        />
      </CardContent>
      <CardContent>
        <Button variant="contained" style={{ background: "green", color: "white" }} onClick={() => handleClick("Cash On Delievery")}>
          Place Order
        </Button>
      </CardContent>
    </Card>
  );
}

export default Cod;
