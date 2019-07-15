import { createStore } from 'redux';
import processingReducer from './processing';
import usersReducer from './users';
import usersToShowReducer from './usersToShow';
import addNewPersonReducer from './newPerson';

const reducer = (state = [], action) => ({
  isLoaded: processingReducer(state.isLoaded, action),
  isLoading: processingReducer(state.isLoaded, action),
  users: usersReducer(state.users, action),
  usersToShow: usersToShowReducer(state.usersToShow, action),
  isAddingNew: addNewPersonReducer(state.isAddingNew, action),
});

const store = createStore(reducer);
export default store;
