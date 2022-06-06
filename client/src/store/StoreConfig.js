import thunk from "redux-thunk";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducer";

const middleWare = [thunk];
const middleWareEnhancer = applyMiddleware(...middleWare);

const enhancer = [middleWareEnhancer];

const composeEnhancers = composeWithDevTools(...enhancer);

const store = createStore(rootReducer, composeEnhancers);
export default store;
