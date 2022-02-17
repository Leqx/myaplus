import { ActionType, TodoActions } from './todo-actions';
import { ItodoDataType, TodoAppInterface } from './todo-state';

const TodoAppReducer = (state: TodoAppInterface, action: ActionType) => {
  switch (action.type) {
    case TodoActions.ADD:
      return { ...state, todoData: [...state.todoData, action.payload] };
    case TodoActions.UPDATE:
      return {
        ...state,
        todoData: state.todoData.map((d: ItodoDataType) =>
          d.id === action.payload ? { ...d, isCompleted: !d.isCompleted } : d
        ),
      };
    case TodoActions.TOGGLE_ALL:
      return {
        ...state,
        todoData: state.todoData.map((d: ItodoDataType) => ({
          ...d,
          isCompleted: action.payload,
        })),
      };
    case TodoActions.DELETE:
      return {
        ...state,
        todoData: state.todoData.filter(
          (d: ItodoDataType) => d.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default TodoAppReducer;
