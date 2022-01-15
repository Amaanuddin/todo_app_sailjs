import { combineReducers } from "redux";
import todosReducer from "./todo";
import boardsReducer from "./board";

const appReducer = combineReducers({ todosReducer, boardsReducer });
const rootReducer = (state, action) => {
  return appReducer(state, action);
};
export default rootReducer;
