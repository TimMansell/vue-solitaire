import { getUserQuery } from './helpers';

// eslint-disable-next-line import/prefer-default-export
export const queries = {
  getUser: async (obj, args, context) => {
    const { client } = context;
    const { uid } = args;

    const variables = {
      uid,
    };

    const response = await getUserQuery(client, variables);

    return response;
  },
};
