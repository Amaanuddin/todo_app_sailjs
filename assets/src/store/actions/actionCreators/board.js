import * as actionTypes from "../actionTypes";

export default {
  setBoards: (params) => (dispatch) => {
    const actionData = {
      type: actionTypes.SETBOARDS,
      payload: params,
    };
    dispatch(actionData);
  },
  addBoard: (params) => (dispatch) => {
    const actionData = {
      type: actionTypes.ADDBOARD,
      payload: params,
    };
    dispatch(actionData);
  },
  deleteBoard: (params) => (dispatch) => {
    const actionData = {
      type: actionTypes.DELETEBOARD,
      payload: params,
    };
    dispatch(actionData);
  },
};
