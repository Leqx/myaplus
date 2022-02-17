export const ADD_TO_DO_ITEM = 'ADD_TO_DO_ITEM';
export const TOGGLE_TO_DO_ITEM = 'TOGGLE_TO_DO_ITEM';

export interface ToDoItemModel {
  id: number;
  task: string;
  isDone: boolean;
}
export interface Action {
  readonly type: string;
  readonly payload: any;
}

let newToDoId: number = 0;

export interface AddToDoItemAction extends Action {
  payload: {
    newToDoItem: ToDoItemModel;
  };
}
export interface ToggleToDoItemAction extends Action {
  payload: {
    removeToDoItem: number;
  };
}

export const AddToDoItem = (newToDoItem: string): AddToDoItemAction => ({
  type: ADD_TO_DO_ITEM,
  payload: {
    newToDoItem: {
      id: newToDoId++,
      task: newToDoItem,
      isDone: false,
    },
  },
});

export const ToggleToDoItem = (idToDoItem: number): ToggleToDoItemAction => ({
  type: TOGGLE_TO_DO_ITEM,
  payload: {
    removeToDoItem: idToDoItem,
  },
});

// export const CREATE_SCHEDULE = 'CREATE_SCHEDULE';

// export const REMOVE_ONE_SCHEDULE = 'REMOVE_ONE_SCHEDULE';

// export const CLEAR_SCHEDULE = 'CLEAR_SCHEDULE';

// export const CREATE_TODO = 'CREATE_TODO';

// export const REMOVE_TODO = 'REMOVE_TODO';

// export const CLEAR_TODOS = 'CLEAR_TODOS';

// export const COMPLETED = 'COMPLETED';
