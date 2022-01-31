import create from 'zustand';
import produce from 'immer';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Turn the set method into an immer proxy
const immer =
  (config: (arg0: (fn: any) => void, arg1: any, arg2: any) => any) =>
  (set: (arg0: any) => void, get: any, api: any) =>
    config(
      (fn: any) => {
        const state = typeof fn === 'function' ? fn : () => fn;
        set(produce(state));
      },
      get,
      api
    );

const zustandCreateStore = (
  children: (
    set: any,
    get: any
  ) => {
    init: () => Promise<void>;
    updateTodo: (item: any) => Promise<unknown>;
    deleteTodo: () => void;
    updateSelectedTask: (item: any) => Promise<unknown>;
    deleteSelectedTask: (item: any) => Promise<unknown>;
    todo: never[];
  }
) => create(immer(children));

const storeStates = {
  todo: [],
};

const storeMethods = (
  set: (arg0: { todo: any }) => void,
  get: () => { (): any; new (): any; todo: any[] }
) => ({
  init: async () => {
    try {
      await AsyncStorage.clear();
      const todo = await AsyncStorage.getItem('TODO');
      if (todo !== null) {
        set({ todo: JSON.parse(todo) });
      }
    } catch (error) {
      console.error(`${error}`);
    }
  },
  updateTodo: async (item: { date: any; todoList: any }) =>
    new Promise<void>(async (resolve) => {
      const datePresent = get().todo.find((data: { date: any }) => {
        if (data.date === item.date) {
          return true;
        }
        return false;
      });

      if (datePresent) {
        const updatedTodo = get().todo.map(
          (data: { date: any; todoList: any }) => {
            if (datePresent.date === data.date) {
              return {
                ...data,
                todoList: [...data.todoList, ...item.todoList],
              };
            }
            return data;
          }
        );

        try {
          set({ todo: updatedTodo });
          await AsyncStorage.setItem('TODO', JSON.stringify(updatedTodo));
        } catch (error) {
          console.error(`${error}`);
        }
      } else {
        const newTodo = [...get().todo, item];

        try {
          set({ todo: newTodo });
          resolve();
          await AsyncStorage.setItem('TODO', JSON.stringify(newTodo));
        } catch (error) {
          console.error(`${error}`);
        }
      }
    }),
  deleteTodo: () => {},
  updateSelectedTask: async (item: { date: any; todo: { key: any } }) =>
    new Promise<void>(async (resolve) => {
      const previousTodo = get().todo;
      const newTodo = previousTodo.map((data: { date: any; todoList: any }) => {
        if (item.date === data.date) {
          const previousTodoList = [...data.todoList];
          const newTodoList = previousTodoList.map((list) => {
            if (list.key === item.todo.key) {
              return item.todo;
            }
            return list;
          });
          return { ...data, todoList: newTodoList };
        }
        return data;
      });
      try {
        set({ todo: newTodo });
        resolve();
        await AsyncStorage.setItem('TODO', JSON.stringify(newTodo));
      } catch (error) {
        console.error(`${error}`);
      }
    }),
  deleteSelectedTask: async (item: { date: any; todo: { key: any } }) =>
    new Promise<void>(async (resolve) => {
      const previousTodo = get().todo;
      const newTodo = previousTodo.map((data: { date: any; todoList: any }) => {
        if (item.date === data.date) {
          const previousTodoList = [...data.todoList];
          const newTodoList = previousTodoList.filter((list) => {
            if (list.key === item.todo.key) {
              return false;
            }
            return true;
          });

          return { ...data, todoList: newTodoList };
        }
        return data;
      });
      const checkForEmpty = newTodo.filter(
        (data: { todoList: string | any[] }) => {
          if (data.todoList.length === 0) {
            return false;
          }
          return true;
        }
      );
      try {
        set({ todo: checkForEmpty });
        resolve();
        await AsyncStorage.setItem('TODO', JSON.stringify(checkForEmpty));
      } catch (error) {
        console.error(`${error}`);
      }
    }),
});

const useStore = zustandCreateStore((set: any, get: any) => ({
  ...storeStates,
  ...storeMethods(set, get),
}));

export default useStore;
