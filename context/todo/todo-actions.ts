import { ItodoDataType } from './todo-state';

export type ActionType =
  | { type: 'ADD'; payload: ItodoDataType }
  | { type: 'TOGGLE_ALL'; payload: boolean }
  | { type: 'DELETE' | 'UPDATE'; payload: string };

export enum TodoActions {
  ADD = 'ADD',
  UPDATE = 'UPDATE',
  TOGGLE_ALL = 'TOGGLE_ALL',
  DELETE = 'DELETE',
}
