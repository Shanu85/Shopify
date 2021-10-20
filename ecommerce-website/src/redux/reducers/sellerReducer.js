import {
    FETCH_SELLER_PRODUCTS,
    CREATE_SELLER_PRODUCT,
    DELETE_SELLER_PRODUCT,
    UPDATE_SELLER_PRODUCT
} from "../types";

const initialState = {
    products: ["Hello"]
};

export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case FETCH_SELLER_PRODUCTS:
            return { ...state, products: payload };
        case CREATE_SELLER_PRODUCT:
            return {
                ...state,
                products: [...state.products, payload]
            };
              
        case DELETE_SELLER_PRODUCT:
            return {
                ...state,
                products: state.products.filter(product => product.id !== payload)
            };
        case UPDATE_SELLER_PRODUCT:
            const updatedProducts = state.products.map(product => {
                if (product.id === action.id) {
                    return { ...product, ...action.payload };
                }
                return product;
            });
            return {
                ...state,
                products: updatedProducts
            };
        default:
            return state;
    }
};