import * as actionTypes from "../actionTypes";

export default {
  setTodos: (params) => (dispatch) => {
    const actionData = {
      type: actionTypes.SETTODOS,
      payload: params,
    };
    dispatch(actionData);
  },
  updateTodo: (params) => (dispatch) => {
    const actionData = {
      type: actionTypes.UPDATETODO,
      payload: params,
    };
    dispatch(actionData);
  },
  addTodo: (params) => (dispatch) => {
    const actionData = {
      type: actionTypes.ADDTODO,
      payload: params,
    };
    dispatch(actionData);
  },
  deleteTodo: (params) => (dispatch) => {
    const actionData = {
      type: actionTypes.DELETETODO,
      payload: params,
    };
    dispatch(actionData);
  },
  deleteTodosByBoardId: (params) => (dispatch) => {
    const actionData = {
      type: actionTypes.DELETETODOSBYBOARDID,
      payload: params,
    };
    dispatch(actionData);
  },
};
