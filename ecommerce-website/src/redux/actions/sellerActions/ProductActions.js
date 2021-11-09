import axios from "axios";

import {
    FETCH_SELLER_PRODUCTS,
    FETCH_SELLER_ORDERS,
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
    axios.get("/api/products/seller/backproduct/").then(response => {
        dispatch({ type: FETCH_SELLER_PRODUCTS, payload: response.data });
        dispatch({ type: STOP_LOADING_UI });
    });
};

export const fetchSellerOrders = () => dispatch => {
    dispatch({ type: START_LOADING_UI });
    axios.get("/api/orders/orderfilter/seller/").then(response => {
        dispatch({ type: FETCH_SELLER_ORDERS, payload: response.data });
        dispatch({ type: STOP_LOADING_UI });
    });
};

export const createSellerProduct = (newSellerProduct, setAddOpen) => dispatch => {
    dispatch({ type: START_LOADING_BUTTON });
    axios
        .post("/api/products/seller/add/", newSellerProduct, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        .then(response => {
            dispatch({ type: CREATE_SELLER_PRODUCT, payload: response.data });
            dispatch(addNotif({ message: "Product has been added" }));
            dispatch({ type: STOP_LOADING_BUTTON });
            setAddOpen(false);
        })
        .catch(error => {
            // console.log(error, newSellerProduct);
            dispatch({ type: STOP_LOADING_BUTTON });
        });
};

export const deleteSellerProduct = (id) => dispatch => {
    dispatch({ type: START_LOADING_BUTTON });
    axios.get(`/api/products/del/${id}/`).then(() => {
        dispatch({ type: DELETE_SELLER_PRODUCT, payload: id });
        dispatch({ type: STOP_LOADING_BUTTON });
        dispatch(
            addNotif({
                message: "Product has been deleted",
                options: { variant: "error" }
            })
        );
    });
};

export const updateSellerProduct = (
    updatedSellerProduct,
    id
) => dispatch => {
    dispatch({ type: START_LOADING_BUTTON });
    axios
        .post(`/api/products/upd/${id}/`, updatedSellerProduct)
        .then(response => {
            dispatch({ type: UPDATE_SELLER_PRODUCT, id, payload: response.data });
            dispatch({ type: STOP_LOADING_BUTTON });
            dispatch(
                addNotif({
                    message: "Product has been updated",
                    options: { variant: "info" }
                })
            );
        })
        .catch(error => {
            // console.log(error);
            dispatch({ type: STOP_LOADING_BUTTON });
        });
};