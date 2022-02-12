import create, {
  State,
  StateCreator,
  SetState,
  GetState,
  StoreApi,
} from 'zustand';
import produce, { Draft } from 'immer';
import { devtools } from 'zustand/middleware';
import { createSelectorHooks } from 'auto-zustand-selectors-hook';
import { WritableDraft } from 'immer/dist/internal';
import { ITodo, TODOS } from './todo';

export type Todo = {
  id: string;
  title: string;
  description: string;
  time: string;
  inMyList: boolean;
  isScheduled: boolean;
  isCompleted: boolean;
};

export type TodoState = {
  todos: Array<ITodo>;
  addTodo: (todos: ITodo) => void;
  updateTodo: (todos: ITodo, id: string) => void;
  removeTodo: (id: string) => void;
  scheduleTodo: (id: string, time: string) => void;
  markAsCompleted: (id: string) => void;
};

type ScheduleStoreSet = (fn: (draft: WritableDraft<TodoState>) => void) => void;

export const immer =
  (config: {
    (set: ScheduleStoreSet): {
      todos: Array<ITodo>;
      addTodo: (todos: ITodo) => void;
      updateTodo: (todos: ITodo, id: string) => void;
      removeTodo: (id: string) => void;
      scheduleTodo: (id: string, time: string) => void;
      markASCompleted: (id: string) => void;
    };
    (arg0: (fn: any) => any, arg1: any): any;
  }) =>
  (
    set: (arg0: (base: unknown, ...args: unknown[]) => unknown) => any,
    get: any
  ) =>
    config((fn: any) => set(produce(fn)), get);

const scheduleStore = (set: ScheduleStoreSet) => ({
  todos: TODOS,
  addTodo: (todos: ITodo) =>
    set((state) => {
      state.todos.push(todos);
    }),
  updateTodo: (todos: ITodo, id: string) =>
    set((state) => {
      let todo = state.todos.find((x) => x.id === id);
      if (!todo) return;
      todo.description = todos.description;
      todo.time = todos?.time;
      todo.inMyList = todos?.inMyList;
      todo.isScheduled = todos?.isScheduled;
      todo.isCompleted = todos?.isCompleted;
    }),
  removeTodo: (id: string) =>
    set((state) => {
      const idx = state.todos.findIndex((x) => x.id === id);
      state.todos.splice(idx, 1);
      // console.log(`removed ${id}`);
    }),
  scheduleTodo: (id: string, time: string) =>
    set((state) => {
      let todo = state.todos.find((x) => x.id === id);
      if (!todo) return;
      todo.time = time;
      todo.isScheduled = true;
    }),
  markASCompleted: (id: string) =>
    set((state) => {
      let todo = state.todos.find((x) => x.id === id);
      if (!todo) return;
      todo.isCompleted = true;
    }),
});

export const useScheduleStore = createSelectorHooks(
  create<TodoState>(devtools(immer(scheduleStore)))
);

// const immer =
//   <TodoState extends State, ScheduleStoreSet extends SetState<TodoState>>(
//     config: StateCreator<
//       TodoState,
//       (
//         partial: ((draft: Draft<TodoState>) => void) | TodoState,
//         replace?: boolean
//       ) => void
//     >
//   ): StateCreator<TodoState, ScheduleStoreSet> =>
//   (set, get, api) =>
//     config(
//       (partial, replace) => {
//         const nextState =
//           typeof partial === 'function'
//             ? produce(partial as (state: Draft<TodoState>) => TodoState)
//             : (partial as TodoState);
//         return set(nextState, replace);
//       },
//       get,
//       api
//     );
