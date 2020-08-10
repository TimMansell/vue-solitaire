export const formatResponse = (response) => ({
  error: false,
  response,
});

export const formatError = () => ({
  error: true,
});
