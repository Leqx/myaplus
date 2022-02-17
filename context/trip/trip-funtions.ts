import { TripActions } from './trip-actions';
import { DispatchAction, ItripDataType, ReturnType } from './trip-state';

export const addTrip = (
  dispatch: DispatchAction,
  body: ItripDataType
): ReturnType => {
  try {
    dispatch({ type: TripActions.ADD, payload: body });
    console.log(body);
    return { message: 'Trip Added Successfully', error: false };
  } catch (error: any) {
    return {
      message: `Sorry an error occurred ${error.message}`,
      error: false,
    };
  }
};
export const deleteTrip = (
  dispatch: DispatchAction,
  id: string
): ReturnType => {
  try {
    dispatch({ type: TripActions.DELETE, payload: id });
    return { message: 'Trip Deleted Successfully', error: false };
  } catch (error: any) {
    return {
      message: `Sorry an error occurred ${error.message}`,
      error: false,
    };
  }
};
export const updateTrip = (
  dispatch: DispatchAction,
  id: string
): ReturnType => {
  try {
    dispatch({ type: TripActions.UPDATE, payload: id });
    return { message: 'Trip Deleted Successfully', error: false };
  } catch (error: any) {
    return {
      message: `Sorry an error occurred ${error.message}`,
      error: false,
    };
  }
};
export const toggleAllTrips = (
  dispatch: DispatchAction,
  done: boolean
): ReturnType => {
  try {
    dispatch({ type: TripActions.TOGGLE_ALL, payload: done });
    return { message: 'Trip List Toggled Successfully', error: false };
  } catch (error: any) {
    return {
      message: `Sorry an error occurred ${error.message}`,
      error: false,
    };
  }
};
