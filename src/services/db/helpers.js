export const formatResponse = (data) => ({
  error: false,
  response: data,
});

export const formatError = () => ({
  error: true,
});
