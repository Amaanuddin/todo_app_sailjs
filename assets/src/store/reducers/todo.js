import * as actionTypes from "../actions/actionTypes";

const initialState = {};

const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SETTODOS: {
      return {
        ...state,
        [action.payload.boardId]: [...action.payload.data],
      };
    }
    case actionTypes.UPDATETODO: {
      const { boardId, todo } = action.payload;
      return {
        ...state,
        [boardId]: state[boardId]
          .map((stateTodo) => {
            if (todo.id === stateTodo.id) {
              return {
                ...stateTodo,
                description: todo.description,
                status: todo.status,
              };
            }
            return stateTodo;
          })
          .sort((a, b) => a.createdAt - b.createdAt),
      };
    }
    case actionTypes.ADDTODO: {
      const { boardId, todo } = action.payload;
      return {
        ...state,
        [boardId]: [...state[boardId], todo],
      };
    }
    case actionTypes.DELETETODO: {
      const { boardId, todoId } = action.payload;
      return {
        ...state,
        [boardId]: state[boardId].filter((todo) => {
          return todo.id !== todoId;
        }),
      };
    }
    case actionTypes.DELETETODOSBYBOARDID: {
      const { boardId } = action.payload;
      const { [boardId]: _, ...rest } = state;
      return rest;
    }
    default:
      return state;
  }
};
export default todosReducer;
