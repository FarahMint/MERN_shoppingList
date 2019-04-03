import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import authReducer from "./auth_reducer";
import errorReducer from "./error_reducer";

export default combineReducers({
  item: itemReducer,
  auth: authReducer,
  error: errorReducer
});
