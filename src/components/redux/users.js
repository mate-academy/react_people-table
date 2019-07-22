const ACTION_TYPE_SET_USERS = 'SET_USERS';
const ACTION_TYPE_ADD_USER = 'ADD_USER';
const ACTION_TYPE_SET_SELECTED = 'SELECT_USER';
const ACTION_TYPE_SET_FILTER = 'SET_FILTER';
const ACTION_TYPE_SET_SORT = 'SET_SORT';

export const setUsers = users => ({
  type: ACTION_TYPE_SET_USERS,
  users,
});

export const addUser = person => ({
  type: ACTION_TYPE_ADD_USER,
  person,
});

export const setSelected = id => ({
  type: ACTION_TYPE_SET_SELECTED,
  id,
});

export const setFilter = field => ({
  type: ACTION_TYPE_SET_FILTER,
  field,
});

export const setSort = field => ({
  type: ACTION_TYPE_SET_SORT,
  field,
});

const initialState = {
  users: [],
  selectedPerson: 0,
  filterField: '',
  sortField: '',
  sortDirection: true,
};

const usersReducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case ACTION_TYPE_SET_USERS:
      return {
        ...state,
        users: action.users,
      };

    case ACTION_TYPE_ADD_USER:
      return state;

    case ACTION_TYPE_SET_SELECTED:
      return {
        ...state,
        selectedPerson: action.id,
      };

    case ACTION_TYPE_SET_FILTER:
      return {
        ...state,
        filterField: action.field,
      };

    case ACTION_TYPE_SET_SORT:
      return {
        ...state,
        sortDirection: !state.sortDirection,
        sortField: action.field,
      };

    default:
      return state;
  }
};

export default usersReducer;

export const prepareUsers = (users, filterField, sortField, sortDirection) => {
  let result = [...users];
  if (sortField) {
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
    const { name } = users[0][sortField].constructor;
    const callback = createSorterBy(sortField, name);
    result = sortDirection
      ? result.sort(callback).reverse()
      : result.sort(callback);
  }

  if (filterField) {
    result = result.filter(user => (
      [user.name, user.mother, user.father]
        .join('')
        .toLowerCase()
        .includes(filterField.trim().toLowerCase())
    ));
  }

  return result;
};
