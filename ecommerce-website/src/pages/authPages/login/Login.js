import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import LoginForm from "./components/LoginForm";
import { login } from "@actions/authActions";
import { phone_number_reg, password_reg, otp_reg } from "../regexes";
import { UserType } from "./components/UserType";

const validationSchema = Yup.object({
  phone_number: Yup.string()
    .matches(phone_number_reg, "Invalid phone number")
    .required("Required field"),
  //Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character:
  password: Yup.string()
    .matches(password_reg, "Weak Password ")
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
    
    dispatch(login(user, otp, setErrors, resetForm));
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
