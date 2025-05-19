import {
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO,
  COMPLETE_TODO,
  COMPLETE_ALL_TODOS,
  CLEAR_COMPLETED,
  UNDO,
  REDO
} from '../constants/ActionTypes';

const initialState = {
  past: [],
  present: [
    {
      text: 'Use Redux',
      completed: false,
      id: 0
    }
  ],
  future: []
};

function handlePresent(state, action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          completed: false,
          text: action.text
        }
      ];
    case DELETE_TODO:
      return state.filter(todo => todo.id !== action.id);
    case EDIT_TODO:
      return state.map(todo =>
        todo.id === action.id ? { ...todo, text: action.text } : todo
      );
    case COMPLETE_TODO:
      return state.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    case COMPLETE_ALL_TODOS:
      const areAllMarked = state.every(todo => todo.completed);
      return state.map(todo => ({
        ...todo,
        completed: !areAllMarked
      }));
    case CLEAR_COMPLETED:
      return state.filter(todo => !todo.completed);
    default:
      return state;
  }
}

export default function todos(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
    case DELETE_TODO:
    case EDIT_TODO:
    case COMPLETE_TODO:
    case COMPLETE_ALL_TODOS:
    case CLEAR_COMPLETED: {
      const newPresent = handlePresent(state.present, action);
      return {
        past: [...state.past, state.present],
        present: newPresent,
        future: []
      };
    }
    case UNDO: {
      if (state.past.length === 0) return state;
      const previous = state.past[state.past.length - 1];
      const newPast = state.past.slice(0, -1);
      return {
        past: newPast,
        present: previous,
        future: [state.present, ...state.future]
      };
    }
    case REDO: {
      if (state.future.length === 0) return state;
      const next = state.future[0];
      const newFuture = state.future.slice(1);
      return {
        past: [...state.past, state.present],
        present: next,
        future: newFuture
      };
    }
    default:
      return state;
  }
}