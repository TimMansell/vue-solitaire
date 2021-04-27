import { createUser, wonGame, lostGame, quitGame } from '../mutation';

describe('Graphql Mutation Resolvers', () => {
  it('createUser', async () => {
    const mockContext = {
      client: {
        mutate: () => ({
          data: {
            createUser: 1,
          },
        }),
      },
    };

    const result = await createUser('', {}, mockContext);

    expect(result).toEqual(1);
  });

  it('wonGame', async () => {
    const mockContext = {
      client: {
        mutate: () => ({
          data: {
            wonGame: 1,
          },
        }),
      },
    };

    const result = await wonGame('', {}, mockContext);

    expect(result).toEqual(1);
  });

  it('lostGame', async () => {
    const mockContext = {
      client: {
        mutate: () => ({
          data: {
            lostGame: 1,
          },
        }),
      },
    };

    const result = await lostGame('', {}, mockContext);

    expect(result).toEqual(1);
  });

  it('quitGame', async () => {
    const mockContext = {
      client: {
        mutate: () => ({
          data: {
            quitGame: 1,
          },
        }),
      },
    };

    const result = await quitGame('', {}, mockContext);

    expect(result).toEqual(1);
  });
});
