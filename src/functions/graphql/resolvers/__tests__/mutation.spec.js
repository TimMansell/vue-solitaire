import {
  createUser,
  newGame,
  wonGame,
  lostGame,
  completedGame,
} from '../mutation';

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

  it('newGame', async () => {
    const mockContext = {
      client: {
        mutate: () => ({
          data: {
            newGame: 1,
          },
        }),
      },
    };

    const result = await newGame('', {}, mockContext);

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

  it('completedGame', async () => {
    const mockContext = {
      client: {
        mutate: () => ({
          data: {
            completedGame: 1,
          },
        }),
      },
    };

    const result = await completedGame('', {}, mockContext);

    expect(result).toEqual(1);
  });
});
