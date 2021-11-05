import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Box, Grid } from "@material-ui/core";
import { Formik } from "formik";
import * as Yup from "yup";
import BuyerRegisterForm from "./components/BuyerRegisterForm";
import SellerRegisterForm from "./components/SellerRegisterForm";
import { register } from "@actions/authActions";
import { phone_number_reg, password_reg, otp_reg } from "../regexes";
import { UserType } from "./components/UserType";
import QRCode from "./components/images/qrcode.png";

const SellerValidationSchema = Yup.object({
  first_name: Yup.string().required("Required field"),
  last_name: Yup.string().required("Required field"),
  phone_number: Yup.string()
    .matches(phone_number_reg, "Invalid phone number")
    .required("Required field"),
  email: Yup.string()
    .email()
    .required("Required field"),
  //Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character:
  password: Yup.string()
    .matches(password_reg, "Weak Password ")
    .required("Required field"),
  confirm_password: Yup.string()
    .matches(password_reg, "Passwords don't match")
    .required("Required field"),
  otp: Yup.string()
    .matches(otp_reg, "Invalid OTP")
    .required("Required Field"),
});

const BuyerValidationSchema = Yup.object({
  first_name: Yup.string().required("Required field"),
  last_name: Yup.string().required("Required field"),
  phone_number: Yup.string()
    .matches(phone_number_reg, "Invalid phone number")
    .required("Required field"),
  //Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character:
  password: Yup.string()
    .matches(password_reg, "Weak Password ")
    .required("Required field"),
  confirm_password: Yup.string()
    .matches(password_reg, "Passwords don't match")
    .required("Required field"),
  otp: Yup.string()
    .matches(otp_reg, "Invalid OTP")
    .required("Required Field"),
});

const Register = () => {

  const values = {
    phone_number: "",
    password: "",
    confirm_password: "",
    first_name: "",
    last_name: "",
    email: "",
    OTP: "",
  };

  const dispatch = useDispatch();

  const [user_type, setType] = useState("NA");
  const changeType = {
    setBuyer: () => {
      setType("Buyer");
    },
    setSeller: () => {
      setType("Seller");
    }
  }

  const handleSubmit = (
    { first_name, last_name, phone_number, email, password, confirm_password, OTP },
    { setErrors, resetForm }
  ) => {
    if (password !== confirm_password) {
      alert("Passwords don't match!");
      return;
    }
    const user = {
      first_name,
      last_name,
      user_type,
      phone_number,
      email,
      password,
      OTP
    };

    dispatch(register(user, setErrors, resetForm));
  };

  return (
    <>
      {user_type === "NA" ?
        <UserType changeType={changeType} /> :
        <>
          <Grid container style={{ margin: '20px 0px 0px', textAlign: 'center' }}>
          <Grid item xs={6} style={{ margin: '150px auto 50px', padding: {left: '100px'}}}>
         
              <p> Step 1: Install the Google Authenticator App </p>
              <p> Step 2: Scan this QR code </p>
              <p> Step 3: Use the OTP to verify </p>
              
              <Box
                component="img"
                sx={{
                  height: 'auto',
                  width: 'auto'
                }}
                alt="QR Code"
                src={QRCode}
              />

            </Grid>

            <Grid item xs={6} style={{ marginBottom: '50px', padding: {right: '100px'} }}>
              <Formik
                initialValues={values}
                validationSchema={user_type === "Seller" ? SellerValidationSchema : BuyerValidationSchema}
                onSubmit={handleSubmit}
              >
                {props => user_type === "Seller" ? <SellerRegisterForm {...props} /> : <BuyerRegisterForm {...props} />}
              </Formik>
            </Grid>
          </Grid>
        </>
      }
    </>
  );
};

export default Register;
