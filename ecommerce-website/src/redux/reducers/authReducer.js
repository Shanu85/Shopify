import {
  AUTH_FAIL,
  AUTH_SUCCESS,
  PRIMARY_AUTH_SUCCESS,
  SECONDARY_AUTH_FAIL,
  REMOVE_FROM_CART,
  ADD_TO_CART,
  CREATE_ORDER
} from "../types";

const initialState = {
  isAuthenticated: null,
  isPrimaryAuthenticated: null,
  user: null,
  url: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case PRIMARY_AUTH_SUCCESS:
      return {
        isAuthenticated: false,
        isPrimaryAuthenticated: true,
        user: payload.user,
        url: payload.url,
      };
    case SECONDARY_AUTH_FAIL:
      return {
        isAuthenticated: false,
        isPrimaryAuthenticated: true,
        user: payload.user,
        url: payload.url,
      };
    case AUTH_SUCCESS:
      return {
        isAuthenticated: true,
        isPrimaryAuthenticated: true,
        user: payload,
        url: null,
      };
    case AUTH_FAIL:
      return {
        isAuthenticated: false,
        isPrimaryAuthenticated: false,
        user: null,
        url: null,
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
