import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk';
import reducers from './reducers';

const rootReducer = combineReducers(reducers)

const composedEnhancer = composeWithDevTools(
    applyMiddleware(thunk)
  )

export const store = createStore(rootReducer, composedEnhancer);
