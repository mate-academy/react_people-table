const ACTION_TYPE_START_LOADING = 'START_LOADING';
const ACTION_TYPE_FINISH_LOADING = 'FINISH_LOADING';

export const startLoading = () => ({
  type: ACTION_TYPE_START_LOADING,
});

export const finishLoading = () => ({
  type: ACTION_TYPE_FINISH_LOADING,
});

const processingReducer = (state = false, action) => {
  const { type } = action;
  switch (type) {
    case ACTION_TYPE_START_LOADING:
      return true;

    case ACTION_TYPE_FINISH_LOADING:
      return false;

    default:
      return state;
  }
};

export default processingReducer;
