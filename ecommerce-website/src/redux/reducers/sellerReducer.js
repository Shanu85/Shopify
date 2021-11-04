import {
    FETCH_SELLER_PRODUCTS,
    FETCH_SELLER_ORDERS,
    CREATE_SELLER_PRODUCT,
    DELETE_SELLER_PRODUCT,
    UPDATE_SELLER_PRODUCT
} from "../types";

const initialState = {
    sellerProducts: [],
    sellerOrders: []
};

export default (state = initialState, action) => {
    const { type, payload } = action;
   
    switch (type) {
        case FETCH_SELLER_PRODUCTS:
            return { ...state, sellerProducts: payload };
        case FETCH_SELLER_ORDERS:
            return { ...state, sellerOrders: payload };
        case CREATE_SELLER_PRODUCT:
            return {
                ...state,
                sellerProducts: [...state.sellerProducts, payload]
            };
              
        case DELETE_SELLER_PRODUCT:
            return {
                ...state,
                sellerProducts: state.sellerProducts.filter(sellerProduct => sellerProduct.id !== payload)
            };
        case UPDATE_SELLER_PRODUCT:
            const updatedSellerProducts = state.sellerProducts.map(sellerProduct => {
                if (sellerProduct.id === action.id) {
                    return { ...sellerProduct, ...action.payload };
                }
                return sellerProduct;
            });
            return {
                ...state,
                sellerProducts: updatedSellerProducts
            };
        default:
            return state;
    }
};