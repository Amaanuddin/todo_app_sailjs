import * as actionTypes from "../actions/actionTypes";

const initialState = [];

const boardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SETBOARDS: {
      return [...state, ...action.payload.data];
    }
    case actionTypes.ADDBOARD: {
      const { board } = action.payload;
      return [...state, board];
    }
    case actionTypes.DELETEBOARD: {
      const { boardId } = action.payload;
      return state.filter((board) => {
        return board.id !== boardId;
      });
    }
    default:
      return state;
  }
};

export default boardsReducer;
