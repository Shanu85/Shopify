import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Grid } from "@material-ui/core";
import { Formik } from "formik";
import * as Yup from "yup";
import OTPForm from "./components/OTPForm";
import { register } from "@actions/authActions";
import { otp_reg } from "../../regexes";
import QRCode from "qrcode.react";

const validationSchema = Yup.object({
  otp: Yup.string()
    .matches(otp_reg, "Invalid OTP")
    .required("Required Field"),
});

const Register = () => {

  const values = { otp: "" };
  const dispatch = useDispatch();

  const user = useSelector(state => state.auth.user);
  const url = useSelector(state => state.auth.url);

  const handleSubmit = (
    { otp },
    { setErrors, resetForm }
  ) => {
    dispatch(register(user, url, otp, setErrors, resetForm));
  };

  return (
    <>
      <Grid container style={{ margin: '20px 0px 0px', textAlign: 'center' }}>
        <Grid item xs={6} style={{ margin: '150px auto 50px', padding: { left: '100px' } }}>

          <p> Step 1: Install the Google Authenticator App </p>
          <p> Step 2: Scan this QR code </p>
          <p> Step 3: Use the OTP to verify </p>

          <QRCode value={url} />
        </Grid>

        <Grid item xs={6} style={{ margin: '150px auto 50px', padding: { right: '100px' } }}>
          <Formik
            initialValues={values}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {props => <OTPForm {...props} />}
          </Formik>
        </Grid>
      </Grid>
    </>
  );
};

export default Register;
