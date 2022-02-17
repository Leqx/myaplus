import { ActionType } from './cart-actions';
import data from './data';

export type DispatchAction = React.Dispatch<ActionType>;

export interface ReturnType {
  message: string;
  error: boolean;
}

export interface IcartDataType {
  readonly id: string;
  readonly name: string;
  readonly category: string;
  readonly description: string;
  readonly img: string;
  readonly price: number;
  readonly quantity: number;
  readonly available: boolean;
  readonly inCart: boolean;
}

export interface CartAppInterface {
  cartData: IcartDataType[];
  totalCarts: number;
}

export const cartInitialState: CartAppInterface = {
  cartData: data,
  totalCarts: 0,
};
