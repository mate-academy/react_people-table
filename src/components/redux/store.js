import { createStore } from 'redux';

const initialStore = {
  isLoaded: false,
  isLoading: false,
  users: [],
  usersToShow: [],
  isAddingNew: false,
};

const reducer = (state, action) => {
  const { type } = action;
  switch (type) {
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
      };

    case 'SET_USERS_TO_SHOW':
      return {
        ...state,
        usersToShow: action.users,
      };

    case 'FILTER_USERS':
      return {
        ...state,
        usersToShow: state.users.filter(user => (
          [user.name, user.mother, user.father]
            .join('')
            .toLowerCase()
            .includes(action.value.trim().toLowerCase())
        )),
      };

    case 'SORT_USERS': {
      const createSorterBy = (field, name) => (a, b) => {
        switch (typeof a[field]) {
          case 'string':
            return a[field].localeCompare(b[field]);

          case 'boolean':
          case 'number':
            return a[field] - b[field];

          case 'object':
            return name === 'Array'
              ? a[field].length - b[field].length
              : 0;

          default:
            return 0;
        }
      };

      const { field, direction } = action;
      const { name } = state.usersToShow[0][field].constructor;
      const callback = createSorterBy(field, name);

      return {
        ...state,
        usersToShow: direction
          ? [...state.usersToShow].sort(callback)
          : [...state.usersToShow].sort(callback).reverse(),
      };
    }

    case 'START_ADDING_NEW': {
      return {
        ...state,
        isAddingNew: true,
      };
    }

    case 'FINISH_ADDING_NEW': {
      return {
        ...state,
        isAddingNew: false,
      };
    }

    case 'ADD_USER':
      return {
        ...state,
        users: [...state.users].concat(action.person),
      };

    case 'ADD_USER_TO_SHOWS':
      return {
        ...state,
        usersToShow: [...state.usersToShow].concat(action.person),
      };

    default:
      return state;
  }
};

const store = createStore(reducer, initialStore);
export default store;
