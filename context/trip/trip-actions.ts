import { ItripDataType } from './trip-state';

export type ActionType =
  | { type: 'ADD'; payload: ItripDataType }
  | { type: 'TOGGLE_ALL'; payload: boolean }
  | { type: 'DELETE' | 'UPDATE'; payload: string };

export enum TripActions {
  ADD = 'ADD',
  UPDATE = 'UPDATE',
  TOGGLE_ALL = 'TOGGLE_ALL',
  DELETE = 'DELETE',
}
