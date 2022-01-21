import React from 'react';
import ProductContext from './product-context';
import { productReducer, cartReducer } from './product-reducer';
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

export default function ProductState(props: {
  children:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) {
  const productInitialState = {
    products: [],
    cart: [],
  };

  // const [productState, dispatch] = React.useReducer(
  //   productReducer,
  //   productInitialState
  // );

  const [cartState, dispatch] = React.useReducer(
    cartReducer,
    productInitialState
  );

  // get products
  const getProducts = (products: []) => {};

  // add to cart
  const addToCart = (cart: []) => {};

  // remove from cart
  const removeFromCart = (cart: []) => {};

  // change qty
  const changeCartQty = (cart: []) => {};

  return (
    <ProductContext.Provider
      value={{
        addToCart,
        removeFromCart,
        changeCartQty,
        cartState,
      }}>
      {props.children}
    </ProductContext.Provider>
  );
}
