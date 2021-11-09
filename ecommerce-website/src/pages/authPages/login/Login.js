import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import LoginForm from "./components/LoginForm";
import { loginUser } from "@actions/authActions";
import { phone_number_reg, password_reg, otp_reg } from "../regexes";
import { UserType } from "./components/UserType";

const validationSchema = Yup.object({
  phone_number: Yup.string()
    .matches(phone_number_reg, "Invalid phone number")
    .required("Required field"),
  password: Yup.string()
    .min(8, "Must be at least 8 characters")
    .required("Required field"),
  otp: Yup.string()
    .matches(otp_reg, "Invalid OTP")
    .required("Required Field"),
});

const Login = () => {
  const values = { phone_number: "", password: "", otp: "" };
  const dispatch = useDispatch();
  
  const [user_type, setType] = useState("NA");
  const changeType = {
    setBuyer: () => {
      setType("Buyer");
    },
    setSeller: () => {
      setType("Seller");
    },
    setAdmin: () => {
      setType("Admin");
    }
  }

  const handleSubmit = (
    { phone_number, password, otp },
    { setErrors, resetForm }
  ) => {
    const user = {
      phone_number,
      password,
      user_type
    };
    
    dispatch(loginUser(user, otp, setErrors, resetForm));
  };

  return (
    <>
      {user_type === "NA" ?
        <UserType changeType={changeType} /> :

        <Formik
          initialValues={values}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {props => <LoginForm {...props} />}
        </Formik>
      }
    </>
  );
};

export default Login;
