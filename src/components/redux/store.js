import { createStore, combineReducers } from 'redux';
import processingReducer from './processing';
import usersReducer from './users';
import usersToShowReducer from './usersToShow';
import addNewPersonReducer from './newPerson';

const reducer = combineReducers({
  isLoaded: processingReducer,
  isLoading: processingReducer,
  users: usersReducer,
  usersToShow: usersToShowReducer,
  isAddingNew: addNewPersonReducer,
});

const store = createStore(reducer);
export default store;
