import React, { useReducer } from 'react';
import ScheduleContext from './schedule-context';
import { useTodoReducer } from './schedule-reducer';

// import {
//   CREATE_SCHEDULE,
//   REMOVE_ONE_SCHEDULE,
//   CLEAR_SCHEDULE,
// } from './schedule-actions';
// import {
//   ITodo,
//   scheduleInitialState,
//   scheduleReducer,
// } from './schedule-reducer';
// interface IScheduleInitialState {
//   todos: ITodo[];
// }

export default function ScheduleState(props: {
  children:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) {
  //  const [state, dispatch] = useReducer(scheduleReducer, scheduleInitialState);

  const [schedule, setSchedule] = React.useState([]);

  return (
    <ScheduleContext.Provider value={{}}>
      {props.children}
    </ScheduleContext.Provider>
  );
}
