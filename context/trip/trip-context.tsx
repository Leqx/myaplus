import React, { createContext, useContext, useReducer } from 'react';
import {
  DispatchAction,
  TripAppInterface,
  tripInitialState,
} from './trip-state';
import TripAppReducer from './trip-reducer';

export const TripAppContext = createContext<{
  tripState: TripAppInterface;
  tripDispatch: DispatchAction;
}>({ tripState: tripInitialState, tripDispatch: () => undefined });

const TripAppProvider = ({ children }: any) => {
  const [tripState, tripDispatch] = useReducer(
    TripAppReducer,
    tripInitialState
  );
  return (
    <TripAppContext.Provider value={{ tripState, tripDispatch }}>
      {children}
    </TripAppContext.Provider>
  );
};
/**
 * returns tripDispatch & the current state
 */
export const useTripAppContext = () => useContext(TripAppContext);

export default TripAppProvider;
