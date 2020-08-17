import { mutations } from '../mutation';

const { createUser, newGame, wonGame, lostGame, completedGame } = mutations;

describe('Graphql Mutation Resolvers', () => {
  it('createUser', async () => {
    const mockArgs = { uid: 100 };

    const mockContext = {
      client: {
        mutate: () => ({
          data: {
            createUser: 1,
          },
        }),
      },
    };

    const result = await createUser('', mockArgs, mockContext);

    expect(result).toEqual(1);
  });

  it('newGame', async () => {
    const mockArgs = { uid: 100 };

    const mockContext = {
      client: {
        mutate: () => ({
          data: {
            newGame: 1,
          },
        }),
      },
    };

    const result = await newGame('', mockArgs, mockContext);

    expect(result).toEqual(1);
  });

  it('wonGame', async () => {
    const mockArgs = { uid: 100 };

    const mockContext = {
      client: {
        mutate: () => ({
          data: {
            updateGameStatus: 1,
          },
        }),
      },
    };

    const result = await wonGame('', mockArgs, mockContext);

    expect(result).toEqual(1);
  });

  it('lostGame', async () => {
    const mockArgs = { uid: 100 };

    const mockContext = {
      client: {
        mutate: () => ({
          data: {
            updateGameStatus: 1,
          },
        }),
      },
    };

    const result = await lostGame('', mockArgs, mockContext);

    expect(result).toEqual(1);
  });

  it('completedGame', async () => {
    const mockArgs = { uid: 100 };

    const mockContext = {
      client: {
        mutate: () => ({
          data: {
            updateGameStatus: 1,
          },
        }),
      },
    };

    const result = await completedGame('', mockArgs, mockContext);

    expect(result).toEqual(1);
  });
});
