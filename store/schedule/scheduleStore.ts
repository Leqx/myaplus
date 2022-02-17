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
import { IUnit, UNIT } from './units';
import { createStore } from 'zustand-immer-store';

export const useTodoStore = createStore(
  { todos: [] as ITodo[], units: UNIT },
  {
    createActions: (set) => ({
      addTodo: (todos: ITodo) =>
        set((draft) => {
          draft.state.todos.push(todos);
          console.log(todos);
        }),
      removeTodo: (id: string) =>
        set((draft) => {
          const idx = draft.state.todos.findIndex((x) => x.id === id);
          draft.state.todos.splice(idx, 1);
        }),
      updateTodo: (id: string) =>
        set((draft) => {
          let todo = draft.state.todos.find((x) => x.id === id);
          if (!todo) return;
          todo.additionalInfo = todo.additionalInfo;
          todo.day = todo?.day;
          todo.time = todo?.time;
          todo.isScheduled = todo?.isScheduled;
          todo.isCompleted = todo?.isCompleted;
        }),
      markAsComplete: (id: string) =>
        set((draft) => {
          let todo = draft.state.todos.find((x) => x.id === id);
          if (!todo) return;
          todo.isCompleted = true;
        }),
    }),
  }
);

export type TodoState = {
  units: Array<IUnit>;
  todos: Array<ITodo>;
  addTodo: (todos: ITodo) => void;
  updateTodo: (todos: ITodo, id: string) => void;
  removeTodo: (id: string) => void;
  scheduleTodo: (id: string, time: string) => void;
  markAsCompleted: (id: string) => void;
};

type ScheduleStoreSet = (fn: (draft: WritableDraft<TodoState>) => void) => void;

const immer =
  (config: {
    (set: ScheduleStoreSet): {
      units: IUnit[];
      todos: ITodo[];
      addTodo: (todos: ITodo) => void;
      updateTodo: (todos: ITodo, id: string) => void;
      removeTodo: (id: string) => void;
      scheduleTodo: (id: string, time: string) => void;
      markASCompleted: (id: string) => void;
    };
    (arg0: (fn: any) => any, arg1: any, arg2: any): any;
  }) =>
  (
    set: (arg0: {
      (base: unknown, ...args: unknown[]): unknown;
      (base: unknown, ...args: unknown[]): unknown;
    }) => any,
    get: any,
    api: { setState: (fn: any) => any }
  ) => {
    api.setState = (fn: any) => set(produce(fn));
    return config((fn) => set(produce(fn)), get, api);
  };

const scheduleStore = (set: ScheduleStoreSet) => ({
  units: UNIT,
  todos: [],
  addTodo: (todos: ITodo) =>
    set((state) => {
      if (todos) {
        const newTodo = state.todos.push(todos);
        console.log(newTodo);

        return newTodo;
      }
    }),
  updateTodo: (todos: ITodo, id: string) =>
    set((state) => {
      let todo = state.todos.find((x) => x.id === id);
      if (!todo) return;
      todo.additionalInfo = todos.additionalInfo;
      todo.time = todos?.time;
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

// const immer = (config) => (set, get, api) => {
//   api.setState = (fn) => set(produce(fn));
//   return config((fn) => set(produce(fn)), get, api);
// };
