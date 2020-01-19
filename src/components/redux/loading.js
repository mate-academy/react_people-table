const ACTION_TYPE_FINISH_LOADING = 'FINISH_LOADING';

export const finishLoading = () => ({
  type: ACTION_TYPE_FINISH_LOADING,
});

const processingReducer = (state = true, action) => {
  const { type } = action;
  switch (type) {
    case ACTION_TYPE_FINISH_LOADING:
      return false;

    default:
      return state;
  }
};

export default processingReducer;
