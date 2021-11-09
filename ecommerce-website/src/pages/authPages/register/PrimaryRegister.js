import React, { useState } from "react";
import { useDispatch } from "react-redux";
import useReactRouter from "use-react-router";
import { Formik } from "formik";
import * as Yup from "yup";
import BuyerRegisterForm from "./components/BuyerRegisterForm";
import SellerRegisterForm from "./components/SellerRegisterForm";
import { registerUser } from "@actions/authActions";
import { phone_number_reg, password_reg } from "../regexes";
import { UserType } from "./components/UserType";

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
    .oneOf([Yup.ref("password"), null], "Doesn't not match")
    .required("Required field"),
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
});

const PrimaryRegister = () => {

  const values = {
    phone_number: "",
    password: "",
    confirm_password: "",
    first_name: "",
    last_name: "",
    email: "",
  };

  const dispatch = useDispatch();
  const { history } = useReactRouter();

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
    { first_name, last_name, phone_number, email, password, confirm_password },
    { setErrors, resetForm }
  ) => {
    const user = {
      first_name,
      last_name,
      user_type,
      phone_number,
      email,
      password,
    };

    dispatch(registerUser(user, history, setErrors, resetForm));
  };

  return (
    <>
      {user_type === "NA" ?
        <UserType changeType={changeType} /> :
        <>
          <Formik
            initialValues={values}
            validationSchema={user_type === "Seller" ? SellerValidationSchema : BuyerValidationSchema}
            onSubmit={handleSubmit}
          >
            {props => user_type === "Seller" ? <SellerRegisterForm {...props} /> : <BuyerRegisterForm {...props} />}
          </Formik>
        </>
      }
    </>
  );
};

export default PrimaryRegister;