const { APOLLO_SERVER_CORS_ENABLED } = process.env;

const cors = APOLLO_SERVER_CORS_ENABLED
  ? {
      cors: {
        origin: '*',
        credentials: true,
      },
    }
  : {};

// eslint-disable-next-line import/prefer-default-export
export const options = {
  ...cors,
};
