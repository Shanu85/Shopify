import {
  AUTH_FAIL,
  AUTH_SUCCESS,
  PRIMARY_AUTH_SUCCESS,
  REMOVE_FROM_CART,
  ADD_TO_CART,
  CREATE_ORDER
} from "../types";

const initialState = {
  isAuthenticated: null,
  isPrimaryAuthenticated: null,
  user: null
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case PRIMARY_AUTH_SUCCESS:
      return {
        isAuthenticated: false,
        isPrimaryAuthenticated: true,
        user: payload,
      };
    case AUTH_SUCCESS:
      return {
        isAuthenticated: true,
        isPrimaryAuthenticated: true,
        user: payload,
      };
    case AUTH_FAIL:
      return {
        isAuthenticated: false,
        isPrimaryAuthenticated: false,
        user: null
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        user: {
          ...state.user,
          cart_items_count: state.user.cart_items_count - 1
        }
      };
    case ADD_TO_CART:
      return {
        ...state,
        user: {
          ...state.user,
          cart_items_count: payload.cart_items_count
        }
      };
    case CREATE_ORDER:
      return {
        ...state,
        user: {
          ...state.user,
          cart_items_count: 0
        }
      };
    default:
      return state;
  }
};
