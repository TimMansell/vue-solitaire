import {
  formatVariables,
  createUserMutation,
  newGameMutation,
  updateGameMutation,
} from './helpers';

// eslint-disable-next-line import/prefer-default-export
export const mutations = {
  createUser: async (obj, args, context) => {
    const { client } = context;
    const { uid } = args;

    const variables = {
      data: {
        uid,
      },
    };

    const response = await createUserMutation(client, variables);

    return response;
  },
  newGame: async (obj, args, context) => {
    const { client } = context;
    const { uid } = args;

    const variables = {
      uid,
    };

    const response = await newGameMutation(client, variables);

    return response;
  },
  wonGame: async (obj, args, context) => {
    const { client } = context;

    const variables = formatVariables(args, {
      won: true,
      lost: false,
      completed: true,
    });

    const response = await updateGameMutation(client, variables);

    return response;
  },
  lostGame: async (obj, args, context) => {
    const { client } = context;

    const variables = formatVariables(args, {
      won: false,
      lost: true,
      completed: true,
    });

    const response = await updateGameMutation(client, variables);

    return response;
  },
  completedGame: async (obj, args, context) => {
    const { client } = context;

    const variables = formatVariables(args, {
      won: false,
      lost: false,
      completed: true,
    });

    const response = await updateGameMutation(client, variables);

    return response;
  },
};
