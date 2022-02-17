import { IcartDataType } from './cart-state';

export type ActionType =
  | { type: 'ADD'; payload: IcartDataType }
  | { type: 'TOGGLE_ALL'; payload: boolean }
  | { type: 'DELETE' | 'UPDATE'; payload: string };

export enum CartActions {
  ADD = 'ADD',
  UPDATE = 'UPDATE',
  TOGGLE_ALL = 'TOGGLE_ALL',
  DELETE = 'DELETE',
}
