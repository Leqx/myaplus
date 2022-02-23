import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { ActivityIndicator } from 'react-native';
import {
  DispatchAction,
  TodoAppInterface,
  todoInitialState,
} from './todo-state';
import TodoAppReducer from './todo-reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addTodoItem, getTodosDataFromStorage } from './todo-funtions';

export const TodoAppContext = createContext<{
  todoState: TodoAppInterface;
  todoDispatch: DispatchAction;
}>({ todoState: todoInitialState, todoDispatch: () => undefined });

const TodoAppProvider = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [todoState, todoDispatch] = useReducer(
    TodoAppReducer,
    todoInitialState
  );

  // useEffect(() => {
  //   async function fetchUser() {
  //     const todos = await getTodosDataFromStorage();
  //     setIsLoading(false);
  //     addTodoItem(todoDispatch, todos);
  //   }
  //   fetchUser();
  // }, []);

  // useEffect(() => {
  //   const { todoData } = todoState;
  //   if (todoData) {
  //     console.log('context');
  //     console.log(JSON.stringify(todoData));
  //     AsyncStorage.setItem('@todos', JSON.stringify(todoData));
  //   }
  // }, [todoState]);

  // if (isLoading) {
  //   return (
  //     <>
  //       <ActivityIndicator size='small' color='#0000ff' />
  //     </>
  //   );
  // }

  return (
    <TodoAppContext.Provider value={{ todoState, todoDispatch }}>
      {children}
    </TodoAppContext.Provider>
  );
};
/**
 * returns todoDispatch & the current state
 */
export const useTodoAppContext = () => useContext(TodoAppContext);

export default TodoAppProvider;
