import React from 'react';
import ProductContext from './product-context';
import productReducer from './product-reducer';
import {
  GET_PRODUCTS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CHANGE_CART_QTY,
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

  const [productState, dispatch] = React.useReducer(
    productReducer,
    productInitialState
  );

  // get products
  const getProducts = (products: []) => {
    dispatch({
      type: GET_PRODUCTS,
    });
  };

  // add to cart
  const addToCart = (cart: []) => {
    dispatch({
      type: ADD_TO_CART,
    });
  };

  // remove from cart
  const removeFromCart = (cart: []) => {
    dispatch({
      type: REMOVE_FROM_CART,
    });
  };

  // change qty
  const changeCartQty = (cart: []) => {
    dispatch({
      type: CHANGE_CART_QTY,
    });
  };

  return (
    <ProductContext.Provider
      value={{
        addToCart,
        removeFromCart,
        changeCartQty,
        productState,
      }}>
      {props.children}
    </ProductContext.Provider>
  );
}
