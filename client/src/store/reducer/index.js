import { combineReducers } from "redux";
import Auth from "./Auth.reducer";
import Post from "./Post.reducer";
import User from "./User.reducer";
import Friend from "./Friend.reducer";
import Message from "./Message.reducer";

const rootReducer = combineReducers({ Auth, Post, User, Friend, Message });

export default rootReducer;
