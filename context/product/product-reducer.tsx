import {
  GET_PRODUCTS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CHANGE_CART_QTY,
} from './product-actions';

const productReducer = (state: any, action: { type: any }) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {};

    case ADD_TO_CART:
      return {};

    case REMOVE_FROM_CART:
      return {};

    case CHANGE_CART_QTY:
      return {};

    default:
      return state;
  }
};

export default productReducer;
