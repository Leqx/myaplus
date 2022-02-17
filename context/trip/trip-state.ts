import { ActionType } from './trip-actions';
import data from './data';

export type DispatchAction = React.Dispatch<ActionType>;

export interface ReturnType {
  message: string;
  error: boolean;
}

export interface ItripDataType {
  readonly id: string;
  readonly pickUpTime: string;
  readonly pickUpCoords: string;
  readonly dropOffTime: string;
  readonly dropOffCoords: string;
  readonly paymentRef: string;
  readonly isCompleted: boolean;
}

export interface TripAppInterface {
  tripData: ItripDataType[];
  totalTrips: number;
}

export const tripInitialState: TripAppInterface = {
  tripData: data,
  totalTrips: 0,
};
