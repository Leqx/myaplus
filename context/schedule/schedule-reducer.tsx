import { Reducer } from 'react';
import { v4 as uuid } from 'uuid';

export enum ReducerActionType {
  CREATE_TODO,
  DELETE_TODO,
  EDIT_TODO,
}
export type Todo = {
  id: string;
  name: string;
  completed: boolean;
};
export type ReducerAction = {
  type: ReducerActionType;
  payload?: any;
};

export const useTodoReducer: Reducer<Todo[], ReducerAction> = (
  state = [],
  action
) => {
  switch (action.type) {
    case ReducerActionType.CREATE_TODO:
      return [...state, { id: uuid(), name: '', completed: false }];
    case ReducerActionType.DELETE_TODO: {
      return state.filter((todo) => todo.id !== action.payload.id);
    }
    case ReducerActionType.EDIT_TODO: {
      return state.map((todo) =>
        todo.id === action.payload.id ? action.payload.id : todo
      );
    }
    default:
      return state;
  }
};

// import { Reducer } from 'react';
// import {
//   REMOVE_ONE_SCHEDULE,
//   CREATE_SCHEDULE,
//   CLEAR_SCHEDULE,
//   CREATE_TODO,
// } from './schedule-actions';

// export interface ITodo {
//   id: string;
//   title: string;
//   additionalInfo: string;
//   day: string;
//   time: string;
//   isScheduled: boolean;
//   isCompleted: boolean;
// }

// interface IScheduleInitialState {
//   todos: ITodo[];
// }

// type Action =
//   | {
//       type: 'create';
//       payload: ITodo[];
//     }
//   | {
//       type: 'remove' | 'update' | 'completed';
//       payload: Partial<ITodo> & Pick<ITodo, 'id'>;
//     };

// export const scheduleInitialState = {
//   todos: [] as ITodo[],
// };

// export const scheduleReducer: Reducer<IScheduleInitialState, Action> = (
//   state: typeof scheduleInitialState,
//   action: Action
// ): ITodo[] => {
//   switch (action.type) {
//     case 'create':
//       return [...state.todos, ...action.payload];

//     case 'remove':
//       return state.todos.filter((item) => item.id !== action.payload.id);

//     case 'update':
//       return state.todos.map((item) => {
//         if (item.id === action.payload.id) {
//           return { ...item, ...action.payload };
//         }
//         return item;
//       });

//     case 'completed':
//       return state.todos.map((item) => {
//         if (item.id === action.payload.id) {
//           action.payload.isCompleted === true;
//           return { ...item, ...action.payload };
//         }
//         return item;
//       });

//     default:
//       return state.todos;
//   }
// };
