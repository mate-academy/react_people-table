const ACTION_TYPE_START_ADDING_NEW = 'START_ADDING_NEW';
const ACTION_TYPE_FINISH_ADDING_NEW = 'FINISH_ADDING_NEW';

export const startAdding = () => ({
  type: ACTION_TYPE_START_ADDING_NEW,
});

export const finishAdding = () => ({
  type: ACTION_TYPE_FINISH_ADDING_NEW,
});

const addNewPersonReducer = (state = false, action) => {
  const { type } = action;
  switch (type) {
    case ACTION_TYPE_START_ADDING_NEW: {
      return true;
    }

    case ACTION_TYPE_FINISH_ADDING_NEW: {
      return false;
    }

    default:
      return state;
  }
};

export default addNewPersonReducer;
