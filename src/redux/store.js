import { createStore } from 'redux';

const initialStore = {
  isLoaded: false,
  isLoading: false,
  users: [],
  usersToShow: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'START_LOADING':
      return {
        ...state,
        isLoading: true,
      };

    case 'FINISH_LOADING':
      return {
        ...state,
        isLoading: false,
      };

    case 'SET_USERS':
      return {
        ...state,
        users: action.users,
        usersToShow: action.users,
      };

    default:
      return state;
  }
};

const store = createStore(reducer, initialStore);
export default store;
