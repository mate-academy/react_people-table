import { createStore, combineReducers } from 'redux';
import processingReducer from './loading';
import usersReducer from './users';

const reducer = combineReducers({
  isLoading: processingReducer,
  users: usersReducer,
});

const store = createStore(reducer);
export default store;
