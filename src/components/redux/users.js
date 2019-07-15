const ACTION_TYPE_SET_USERS = 'SET_USERS';
const ACTION_TYPE_ADD_USER = 'ADD_USER';

export const setUsers = users => ({
  type: ACTION_TYPE_SET_USERS,
  users,
});

export const addUser = person => ({
  type: ACTION_TYPE_ADD_USER,
  person,
});

const usersReducer = (state = [], action) => {
  const { type } = action;
  switch (type) {
    case ACTION_TYPE_SET_USERS:
      return action.users;

    case ACTION_TYPE_ADD_USER:
      return [...state].concat(action.person);

    default:
      return state;
  }
};

export default usersReducer;
