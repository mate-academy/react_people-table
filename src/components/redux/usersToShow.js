const ACTION_TYPE_SET_USERS_TO_SHOW = 'SET_USERS_TO_SHOW';
const ACTION_TYPE_FILTER_USERS = 'FILTER_USERS';
const ACTION_TYPE_SORT_USERS = 'SORT_USERS';
const ACTION_TYPE_ADD_USER_TO_SHOWS = 'ADD_USER_TO_SHOWS';

export const setUsersToShow = users => ({
  type: ACTION_TYPE_SET_USERS_TO_SHOW,
  users,
});

export const filterUsers = (value, users) => ({
  type: ACTION_TYPE_FILTER_USERS,
  value,
  users,
});

export const sortUsers = (field, direction, users) => ({
  type: ACTION_TYPE_SORT_USERS,
  field,
  direction,
  users,
});

export const addUserToShows = person => ({
  type: ACTION_TYPE_ADD_USER_TO_SHOWS,
  person,
});

const usersToShowReducer = (state = [], action) => {
  const { type } = action;
  switch (type) {
    case ACTION_TYPE_SET_USERS_TO_SHOW:
      return action.users;

    case ACTION_TYPE_FILTER_USERS: {
      return [...action.users].filter(user => (
        [user.name, user.mother, user.father]
          .join('')
          .toLowerCase()
          .includes(action.value.trim().toLowerCase())
      ));
    }

    case ACTION_TYPE_SORT_USERS: {
      const createSorterBy = (field, name) => (a, b) => {
        switch (typeof a[field]) {
          case 'string':
            return a[field].localeCompare(b[field]);

          case 'boolean':
          case 'number':
            return a[field] - b[field];

          case 'object':
            return name === 'Array' ? a[field].length - b[field].length : 0;

          default:
            return 0;
        }
      };

      const { field, direction } = action;
      const { name } = state[0][field].constructor;
      const callback = createSorterBy(field, name);

      return direction
        ? [...state].sort(callback)
        : [...state].sort(callback).reverse();
    }

    case ACTION_TYPE_ADD_USER_TO_SHOWS:
      return [...state].concat(action.person);

    default:
      return state;
  }
};

export default usersToShowReducer;
