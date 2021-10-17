import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";

import BuyerRegisterForm from "./components/BuyerRegisterForm";
import SellerRegisterForm from "./components/SellerRegisterForm";
import { register } from "@actions/authActions";
import { phone_number_reg } from "../regexes";
import { UserType } from "./components/UserType";

const validationSchema = Yup.object({
  first_name: Yup.string().required("Required field"),
  last_name: Yup.string().required("Required field"),
  phone_number: Yup.string()
    .matches(phone_number_reg, "Invalid phone number")
    .required("Required field"),
  email: Yup.string()
    .email()
    .required("Required field"),
  password: Yup.string()
    .min(8, "Must be at least 8 characters")
    .required("Required field")
});

const Register = () => {
  const values = {
    phone_number: "",
    password: "",
    first_name: "",
    last_name: "",
    email:"",
    user_type: "NA"
  };
  const dispatch = useDispatch();

  const [user_type, setType] = useState("NA");
  const changeType = {
    setBuyer: () => {
      setType("Buyer");
      values[user_type] = "Buyer";
    },
    setSeller: () => {
      setType("Seller");
      values[user_type] = "Seller"
    }
  }

  const handleSubmit = (
    { first_name, last_name, phone_number, email, password },
    { setErrors, resetForm }
  ) => {
    const user = {
      first_name,
      last_name,
      user_type,
      phone_number,
      email,
      password
    };
    // console.log(user_type);
    dispatch(register(user, setErrors, resetForm));
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
          {props => user_type === "Buyer" ? <BuyerRegisterForm {...props}/>:<SellerRegisterForm {...props}/>}
        </Formik>
      }
    </>
  );
};

export default Register;
