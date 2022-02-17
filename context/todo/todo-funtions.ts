import { TodoActions } from './todo-actions';
import { DispatchAction, ItodoDataType, ReturnType } from './todo-state';

export const addTodoItem = (
  dispatch: DispatchAction,
  body: ItodoDataType
): ReturnType => {
  try {
    dispatch({ type: TodoActions.ADD, payload: body });
    console.log(body);
    return { message: 'Todo Added Successfully', error: false };
  } catch (error: any) {
    return {
      message: `Sorry an error occurred ${error.message}`,
      error: false,
    };
  }
};
export const deleteTodoItem = (
  dispatch: DispatchAction,
  id: string
): ReturnType => {
  try {
    dispatch({ type: TodoActions.DELETE, payload: id });
    return { message: 'Todo Deleted Successfully', error: false };
  } catch (error: any) {
    return {
      message: `Sorry an error occurred ${error.message}`,
      error: false,
    };
  }
};
export const updateTodoItem = (
  dispatch: DispatchAction,
  id: string
): ReturnType => {
  try {
    dispatch({ type: TodoActions.UPDATE, payload: id });
    return { message: 'Todo Deleted Successfully', error: false };
  } catch (error: any) {
    return {
      message: `Sorry an error occurred ${error.message}`,
      error: false,
    };
  }
};
export const toggleAllTodoItems = (
  dispatch: DispatchAction,
  done: boolean
): ReturnType => {
  try {
    dispatch({ type: TodoActions.TOGGLE_ALL, payload: done });
    return { message: 'Todo List Toggled Successfully', error: false };
  } catch (error: any) {
    return {
      message: `Sorry an error occurred ${error.message}`,
      error: false,
    };
  }
};
