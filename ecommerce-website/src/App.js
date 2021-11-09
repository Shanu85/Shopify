import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SnackbarProvider } from "notistack";
import axios from "axios";
import Routes from "./Routes";
import Notifer from "./components/layouts/Notifer";
import { loadUser } from "@actions/authActions";
import { useSelector } from "react-redux";

// Set csrf token
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user, url } = useSelector(state => state.auth);

  useEffect(() => {
    console.log("Shanu ki BFF: ", url);
    dispatch(loadUser(isAuthenticated, user, url));
  }, [dispatch]);

  return (
    <SnackbarProvider preventDuplicate>
      <Router>
        <Notifer />
        <Routes />
      </Router>
    </SnackbarProvider>
  );
};

export default App;
