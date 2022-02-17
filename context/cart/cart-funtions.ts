import { CartActions } from './cart-actions';
import { DispatchAction, IcartDataType, ReturnType } from './cart-state';

export const addCartItem = (
  dispatch: DispatchAction,
  body: IcartDataType
): ReturnType => {
  try {
    dispatch({ type: CartActions.ADD, payload: body });
    return { message: 'Cart Item Added Successfully', error: false };
  } catch (error: any) {
    return {
      message: `Sorry an error occurred ${error.message}`,
      error: false,
    };
  }
};
export const deleteCartItem = (
  dispatch: DispatchAction,
  id: string
): ReturnType => {
  try {
    dispatch({ type: CartActions.DELETE, payload: id });
    return { message: 'Cart Item Deleted Successfully', error: false };
  } catch (error: any) {
    return {
      message: `Sorry an error occurred ${error.message}`,
      error: false,
    };
  }
};
export const updateCartItem = (
  dispatch: DispatchAction,
  id: string
): ReturnType => {
  try {
    dispatch({ type: CartActions.UPDATE, payload: id });
    return { message: 'Cart Item Deleted Successfully', error: false };
  } catch (error: any) {
    return {
      message: `Sorry an error occurred ${error.message}`,
      error: false,
    };
  }
};
export const toggleAllCartItems = (
  dispatch: DispatchAction,
  done: boolean
): ReturnType => {
  try {
    dispatch({ type: CartActions.TOGGLE_ALL, payload: done });
    return { message: 'Cart Item List Toggled Successfully', error: false };
  } catch (error: any) {
    return {
      message: `Sorry an error occurred ${error.message}`,
      error: false,
    };
  }
};
