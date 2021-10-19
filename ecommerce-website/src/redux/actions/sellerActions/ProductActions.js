import axios from "axios";

import {
    FETCH_SELLER_PRODUCTS,
    CREATE_SELLER_PRODUCT,
    DELETE_SELLER_PRODUCT,
    UPDATE_SELLER_PRODUCT,
    START_LOADING_UI,
    STOP_LOADING_UI,
    START_LOADING_BUTTON,
    STOP_LOADING_BUTTON
} from "../../types";
import { addNotif } from "../notifActions";

export const fetchSellerProducts = () => dispatch => {
    dispatch({ type: START_LOADING_UI });
    //   axios.get("/api/products").then(response => {
    //     dispatch({ type: FETCH_SELLER_PRODUCTS, payload: response.data });
    //     dispatch({ type: STOP_LOADING_UI });
    //   });
    dispatch({ type: FETCH_SELLER_PRODUCTS, payload: ["Hello Gandu"] });
    dispatch({ type: STOP_LOADING_UI });
};

export const createSellerProduct = (product, setErrors, handleClose) => dispatch => {
    dispatch({ type: START_LOADING_BUTTON });
    axios
        .post("/api/products/", product)
        .then(response => {
            dispatch({ type: CREATE_SELLER_PRODUCT, payload: response.data });
            handleClose();
            dispatch(addNotif({ message: "Product has been added" }));
            dispatch({ type: STOP_LOADING_BUTTON });
        })
        .catch(error => {
            setErrors(error.response.data);
            dispatch({ type: STOP_LOADING_BUTTON });
        });
};

export const deleteSellerProduct = (id, handleClose) => dispatch => {
    dispatch({ type: START_LOADING_BUTTON });
    axios.delete(`/api/products/${id}/`).then(() => {
        dispatch({ type: DELETE_SELLER_PRODUCT, payload: id });
        dispatch({ type: STOP_LOADING_BUTTON });
        handleClose();
        dispatch(
            addNotif({
                message: "Product has been deleted",
                options: { variant: "error" }
            })
        );
    });
};

export const updateSellerProduct = (
    product,
    id,
    setErrors,
    handleClose
) => dispatch => {
    dispatch({ type: START_LOADING_BUTTON });
    axios
        .put(`/api/seller/product/${id}/`, product)
        .then(response => {
            dispatch({ type: UPDATE_SELLER_PRODUCT, id, payload: response.data });
            dispatch({ type: STOP_LOADING_BUTTON });
            handleClose();
            dispatch(
                addNotif({
                    message: "Product has been updated",
                    options: { variant: "info" }
                })
            );
        })
        .catch(error => {
            setErrors(error.response.data);
            dispatch({ type: STOP_LOADING_BUTTON });
        });
};