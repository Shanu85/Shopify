import axios from "axios";

import { addNotif } from "./notifActions";
import {
  AUTH_FAIL,
  AUTH_SUCCESS,
  PRIMARY_AUTH_SUCCESS,
  SECONDARY_AUTH_FAIL,
  START_LOADING_UI,
  STOP_LOADING_UI,
  START_LOADING_BUTTON,
  STOP_LOADING_BUTTON
} from "../types";

export const loadUser = () => dispatch => {
  dispatch({ type: START_LOADING_UI });
  axios
    .get("/api/user/")
    .then(response => {
      if (response.data.isAuthenticated === true) {
        dispatch({ type: AUTH_SUCCESS, payload: response.data });
      } else {
        dispatch(deleteUser(response.data));
        dispatch({ type: AUTH_FAIL });
      }
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch(() => {
      dispatch({ type: AUTH_FAIL });
      dispatch({ type: STOP_LOADING_UI });
    });
};


export const deleteUser = (user) => dispatch => {
  axios
    .post("/api/auth/user/delete/", user)
    .then(response => {
      dispatch(
        addNotif({
          message: "Authentication Failed",
          options: { variant: "error" }
        })
      );
    })
};



export const loginUser = (user, otp, setErrors, resetForm) => (dispatch, getState) => {
  dispatch({ type: START_LOADING_BUTTON });
  axios
    .post('/api/auth/login/', user)
    .then(response => {
      dispatch(login(response.data, otp, setErrors, resetForm));
    })
    .catch(error => {
      dispatch({ type: AUTH_FAIL });
      setErrors(error.response.data);
      dispatch({ type: STOP_LOADING_BUTTON });
    });
};

export const login = (user, otp, setErrors, resetForm) => (dispatch, getState) => {
  dispatch({ type: START_LOADING_BUTTON });
  axios
    .post(`/api/auth/totp/login/${otp}/`, user)
    .then(response => {
      dispatch({ type: AUTH_SUCCESS, payload: user});
      dispatch({ type: STOP_LOADING_BUTTON });
      resetForm();
      if (user.user_type === 'Admin') {
        window.location.reload(false);
      }
      dispatch(
        addNotif({
          message: `Welcome ${getState().auth.user.first_name || ""}`,
          options: { variant: "info" }
        })
      );
    })
    .catch(error => {
      dispatch({ type: AUTH_FAIL });
      setErrors(error.response.data);
      dispatch({ type: STOP_LOADING_BUTTON });
    });
};


export const registerUser = (user, history, setErrors, resetForm) => dispatch => {
  dispatch({ type: START_LOADING_BUTTON });
  axios
    .post('/api/auth/register/', user)
    .then(response => {
      dispatch(primaryRegister(response.data, history, setErrors, resetForm));
    })
    .catch(error => {
      dispatch({ type: AUTH_FAIL });
      setErrors(error.response.data);
      dispatch({ type: STOP_LOADING_BUTTON });
    });
};


export const primaryRegister = (user, history, setErrors, resetForm) => dispatch => {
  axios
    .get("/api/auth/totp/create/", user)
    .then(response => {
      dispatch({ type: PRIMARY_AUTH_SUCCESS, payload: { user: user, url: response.data } });
      dispatch({ type: STOP_LOADING_BUTTON });
      resetForm();
      history.push("/register");
      dispatch(addNotif({ message: "Your account registered successfully" }));
    })
    .catch(error => {
      dispatch({ type: AUTH_FAIL });
      setErrors(error.response.data);
      dispatch({ type: STOP_LOADING_BUTTON });
    });
};


export const register = (user, url, otp, setErrors, resetForm) => dispatch => {
  dispatch({ type: START_LOADING_BUTTON });
  axios
    .post(`/api/auth/totp/login/${otp}/`, user)
    .then(response => {
      dispatch({ type: AUTH_SUCCESS, payload: user });
      dispatch({ type: STOP_LOADING_BUTTON });
      resetForm();
      dispatch(addNotif({ message: "2 Factor Authentication has been established" }));
    })
    .catch(error => {
      dispatch({ type: SECONDARY_AUTH_FAIL, payload: { user: user, url: url } });
      // setErrors(error.response.data);
      dispatch({ type: STOP_LOADING_BUTTON });
    });
};


export const logout = () => dispatch => {
  dispatch({ type: START_LOADING_UI });
  axios.post("/api/auth/logout/").then(() => {
    dispatch({ type: AUTH_FAIL });
    dispatch({ type: STOP_LOADING_UI });
  });
};


export const adminChangePassword = (
  data,
  setErrors,
  resetForm,
  history
) => dispatch => {
  dispatch({ type: START_LOADING_BUTTON });
  axios
    .put("/api/auth/change-password/", data)
    .then(response => {
      dispatch({ type: STOP_LOADING_BUTTON });
      resetForm();
      history.push("/admin_dashboard");
      dispatch(
        addNotif({ message: "Your password has been changed successfully" })
      );
    })
    .catch(error => {
      setErrors(error.response.data);
      dispatch({ type: STOP_LOADING_BUTTON });
    });
};


export const buyerChangePassword = (
  data,
  setErrors,
  resetForm,
  history
) => dispatch => {
  dispatch({ type: START_LOADING_BUTTON });
  axios
    .put("/api/auth/change-password/", data)
    .then(response => {
      dispatch({ type: STOP_LOADING_BUTTON });
      resetForm();
      history.push("/profile");
      dispatch(
        addNotif({ message: "Your password has been changed successfully" })
      );
    })
    .catch(error => {
      setErrors(error.response.data);
      dispatch({ type: STOP_LOADING_BUTTON });
    });
};


export const sellerChangePassword = (
  data,
  setErrors,
  resetForm,
  history
) => dispatch => {
  dispatch({ type: START_LOADING_BUTTON });
  axios
    .put("/api/auth/change-password/", data)
    .then(response => {
      dispatch({ type: STOP_LOADING_BUTTON });
      resetForm();
      history.push("/seller_dashboard");
      dispatch(
        addNotif({ message: "Your password has been changed successfully" })
      );
    })
    .catch(error => {
      setErrors(error.response.data);
      dispatch({ type: STOP_LOADING_BUTTON });
    });
};


export const resetPassword = (email, setErrors, history) => dispatch => {
  dispatch({ type: START_LOADING_BUTTON });
  axios
    .post("/api/auth/reset-password/", { email })
    .then(() => {
      dispatch({ type: STOP_LOADING_BUTTON });
      history.push("/login");
      dispatch(
        addNotif({
          message: "Reset password link sended to your email"
        })
      );
    })
    .catch(() => {
      setErrors({ email: "Unregistered email address" });
      dispatch({ type: STOP_LOADING_BUTTON });
    });
};


export const resetPasswordConfirm = (
  password,
  token,
  setErrors,
  history
) => dispatch => {
  dispatch({ type: START_LOADING_BUTTON });
  axios
    .post("/api/auth/reset-password/confirm/", { password, token })
    .then(() => {
      dispatch({ type: STOP_LOADING_BUTTON });
      history.push("/login");
      dispatch(
        addNotif({
          message: "Password changed you can login"
        })
      );
    })
    .catch(error => {
      error.response.data.password &&
        setErrors({ new_password: "This password is too common." });
      dispatch({ type: STOP_LOADING_BUTTON });
    });
};


export const updateUser = (user, setErrors, history) => dispatch => {
  dispatch({ type: START_LOADING_BUTTON });
  axios
    .put("/api/user/", user)
    .then(response => {
      dispatch({ type: AUTH_SUCCESS, payload: response.data });
      dispatch({ type: STOP_LOADING_BUTTON });
      history.push("/profile/personal-info");
      dispatch(
        addNotif({
          message: "Personal info was updated",
          options: { variant: "info" }
        })
      );
    })
    .catch(error => {
      setErrors(error.response.data);
      dispatch({ type: STOP_LOADING_BUTTON });
    });
};


export const updateSellerInfo = (user, setErrors, resetForm, history) => dispatch => {
  dispatch({ type: START_LOADING_BUTTON });
  axios
    .put("/api/user/", user)
    .then(response => {
      dispatch({ type: AUTH_SUCCESS, payload: response.data });
      dispatch({ type: STOP_LOADING_BUTTON });
      resetForm();
      history.push("/seller_dashboard");
      dispatch(
        addNotif({
          message: "Personal Info was updated",
          options: { variant: "info" }
        })
      )
    })
    .catch(error => {
      setErrors(error.response.data);
      dispatch({ type: START_LOADING_BUTTON })
    })
};


// export const addNewProduct=(data,history)=>dispatch=>{
//   dispatch({type:START_LOADING_BUTTON})
//   axios.put("/api/AddNewProduct")
//   .then(response=>{
//     dispatch({type:AUTH_SUCCESS,role:user.user_type,payload:response.data});
//     dispatch({type:STOP_LOADING_BUTTON});
//     history.pu
//   })
// }
