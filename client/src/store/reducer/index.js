import { combineReducers } from "redux";
import Auth from "./Auth.reducer";
import Post from "./Post.reducer";

const rootReducer = combineReducers({ Auth, Post });

export default rootReducer;
