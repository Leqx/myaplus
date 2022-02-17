import { ActionType, CartActions } from './cart-actions';
import { IcartDataType, CartAppInterface } from './cart-state';

const CartAppReducer = (state: CartAppInterface, action: ActionType) => {
  switch (action.type) {
    case CartActions.ADD:
      return { ...state, cartData: [...state.cartData, action.payload] };
    case CartActions.UPDATE:
      return {
        ...state,
        cartData: state.cartData.map((d: IcartDataType) =>
          d.id === action.payload ? { ...d, inCart: !d.inCart } : d
        ),
      };
    case CartActions.TOGGLE_ALL:
      return {
        ...state,
        cartData: state.cartData.map((d: IcartDataType) => ({
          ...d,
          inCart: action.payload,
        })),
      };
    case CartActions.DELETE:
      return {
        ...state,
        cartData: state.cartData.filter(
          (d: IcartDataType) => d.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default CartAppReducer;
