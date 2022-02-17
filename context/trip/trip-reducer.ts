import { ActionType, TripActions } from './trip-actions';
import { ItripDataType, TripAppInterface } from './trip-state';

const TripAppReducer = (state: TripAppInterface, action: ActionType) => {
  switch (action.type) {
    case TripActions.ADD:
      return { ...state, tripData: [...state.tripData, action.payload] };
    case TripActions.UPDATE:
      return {
        ...state,
        tripData: state.tripData.map((d: ItripDataType) =>
          d.id === action.payload ? { ...d, isCompleted: !d.isCompleted } : d
        ),
      };
    case TripActions.TOGGLE_ALL:
      return {
        ...state,
        tripData: state.tripData.map((d: ItripDataType) => ({
          ...d,
          isCompleted: action.payload,
        })),
      };
    case TripActions.DELETE:
      return {
        ...state,
        tripData: state.tripData.filter(
          (d: ItripDataType) => d.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default TripAppReducer;
