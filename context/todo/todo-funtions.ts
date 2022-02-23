import { TodoActions } from './todo-actions';
import { DispatchAction, ItodoDataType, ReturnType } from './todo-state';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getTodosDataFromStorage = async () => {
  try {
    const todoValue = await AsyncStorage.getItem('@todos');
    return todoValue != null ? JSON.parse(todoValue) : null;
  } catch (error: any) {
    return {
      message: `Sorry an error occurred reading value ${error.message}`,
      error: false,
    };
  }
};

export const removeTodosDataFromStorage = async () => {
  try {
    return await AsyncStorage.removeItem('@todos');
  } catch (error: any) {
    return {
      message: `Sorry an error occurred removing values ${error.message}`,
      error: false,
    };
  }
};

export const clearAllTodosDataFromStorage = async () => {
  try {
    return await await AsyncStorage.clear();
  } catch (error: any) {
    return {
      message: `Sorry an error occurred clearing values ${error.message}`,
      error: false,
    };
  }
};

export const addTodoItem = (
  dispatch: DispatchAction,
  body: ItodoDataType
): ReturnType => {
  try {
    dispatch({ type: TodoActions.ADD, payload: body });
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
