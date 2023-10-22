import { createStore, combineReducers } from "redux";
import scoreReducer from "./Score";

const rootReducer = combineReducers({
  scoreReducer,
});
const store = createStore(rootReducer);
export default store;
