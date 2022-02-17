import { ActionType } from './todo-actions';
import data from './data';

export type DispatchAction = React.Dispatch<ActionType>;

export interface ReturnType {
  message: string;
  error: boolean;
}

export interface ItodoDataType {
  readonly id: string;
  readonly title: string;
  readonly additionalInfo: string;
  readonly day: string;
  readonly time: string;
  readonly isScheduled: boolean;
  readonly isCompleted: boolean;
}

export interface TodoAppInterface {
  todoData: ItodoDataType[];
  totalTodos: number;
}

export const todoInitialState: TodoAppInterface = {
  todoData: data,
  totalTodos: 0,
};
