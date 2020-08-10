export const formatResponse = (response, name) => {
  const data = response.data[name];
  const { _id: id } = data;

  return {
    ...data,
    id,
  };
};

export const formatVariables = (args, params) => {
  const { id, data } = args;

  const variables = {
    id,
    data: {
      ...data,
      ...params,
    },
  };

  return variables;
};
