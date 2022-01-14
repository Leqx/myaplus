import React from 'react';
import UnitsContext from './units-context';
import unitsReducer from './units-reducer';
import { GET_UNITS, SAVE_UNITS } from './units-actions';

export default function UnitsState(props: {
  children:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) {
  const unitsInitialState = {
    units: [],
  };

  const [unitsState, dispatch] = React.useReducer(
    unitsReducer,
    unitsInitialState
  );

  // get units
  const getUnits = (units: []) => {
    dispatch({
      type: GET_UNITS,
    });
  };

  // save units
  const saveUnits = (units: []) => {
    dispatch({
      type: SAVE_UNITS,
    });
  };

  return (
    <UnitsContext.Provider
      value={{
        unitsState,
        getUnits,
        saveUnits,
      }}>
      {props.children}
    </UnitsContext.Provider>
  );
}
