export const setupStore = ({ dispatch, ...getters }) => ({
  dispatch,
  getters,
});

export const setupRoute = ({ ...params }) => ({
  params,
});
