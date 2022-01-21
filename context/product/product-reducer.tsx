import {
  GET_PRODUCTS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CHANGE_CART_QTY,
  SORT_BY_PRICE,
  FILTER_BY_STOCK,
  FILTER_BY_DELIVERY,
  FILTER_BY_RATING,
  FILTER_BY_SEARCH,
  CLEAR_FILTERS,
} from './product-actions';

export const cartReducer = (
  state: any,
  action: { type: any; payload: any }
) => {
  switch (action.type) {
    case ADD_TO_CART:
      return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((c: { id: any }) => c.id !== action.payload.id),
      };

    case CHANGE_CART_QTY:
      return {
        ...state,
        cart: state.cart.filter((c: { id: any; qty: any }) =>
          c.id === action.payload.id ? (c.qty = action.payload.qty) : c.qty
        ),
      };

    default:
      return state;
  }
};

export const productReducer = (
  state: { byStock: any; byFastDelivery: any },
  action: { type: any; payload: any }
) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {};
    case SORT_BY_PRICE:
      return { ...state, sort: action.payload };
    case FILTER_BY_STOCK:
      return { ...state, byStock: !state.byStock };
    case FILTER_BY_DELIVERY:
      return { ...state, byFastDelivery: !state.byFastDelivery };
    case FILTER_BY_RATING:
      return { ...state, byRating: action.payload };
    case FILTER_BY_SEARCH:
      return { ...state, searchQuery: action.payload };
    case CLEAR_FILTERS:
      return { byStock: false, byFastDelivery: false, byRating: 0 };
    default:
      return state;
  }
};
