import React, { createContext, useContext, useReducer } from 'react';
import {
  DispatchAction,
  CartAppInterface,
  cartInitialState,
} from './cart-state';
import CartAppReducer from './cart-reducer';

export const CartAppContext = createContext<{
  cartState: CartAppInterface;
  cartDispatch: DispatchAction;
}>({ cartState: cartInitialState, cartDispatch: () => undefined });

const CartAppProvider = ({ children }: any) => {
  const [cartState, cartDispatch] = useReducer(
    CartAppReducer,
    cartInitialState
  );
  return (
    <CartAppContext.Provider value={{ cartState, cartDispatch }}>
      {children}
    </CartAppContext.Provider>
  );
};
/**
 * returns cartDispatch & the current state
 */
export const useCartAppContext = () => useContext(CartAppContext);

export default CartAppProvider;
