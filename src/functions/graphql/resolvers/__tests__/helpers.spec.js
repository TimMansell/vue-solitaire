import {
  formatVariables,
  // getUserQuery,
  // getUserStatsQuery,
  // globalStatsQuery,
  // createUserMutation,
  updateGameMutation,
  // newGameMutation,
} from '../helpers';

describe('Graphql Resolver helpers', () => {
  it('formatVariables', () => {
    const args = {
      id: 1,
      data: {
        moves: 10,
      },
    };

    const params = {
      won: true,
      completed: true,
    };

    const result = formatVariables(args, params);

    expect(result).toEqual({
      data: {
        completed: true,
        moves: 10,
        won: true,
      },
      id: 1,
    });
  });

  // it('getUserQuery', async () => {
  //   const mockVariables = { uid: 100 };

  //   const mockClient = {
  //     query: () => ({
  //       data: {
  //         findUserByLID: 1,
  //       },
  //     }),
  //   };

  //   const result = await getUserQuery(mockClient, mockVariables);

  //   expect(result).toEqual(1);
  // });

  // it('getUserStatsQuery', async () => {
  //   const userStats = {
  //     count: 1,
  //     won: 1,
  //     lost: 1,
  //     completed: 1,
  //   };

  //   const mockVariables = { uid: 100 };

  //   const mockClient = {
  //     query: () => ({
  //       data: {
  //         userStats,
  //       },
  //     }),
  //   };

  //   const result = await getUserStatsQuery(mockClient, mockVariables);

  //   expect(result).toEqual(userStats);
  // });

  // it('globalStatsQuery', async () => {
  //   const mockClient = {
  //     query: () => ({
  //       data: {
  //         globalStats: 1,
  //       },
  //     }),
  //   };

  //   const result = await globalStatsQuery(mockClient);

  //   expect(result).toEqual(1);
  // });

  // it('createUserMutation', async () => {
  //   const mockVariables = { uid: 100 };

  //   const mockClient = {
  //     mutate: () => ({
  //       data: {
  //         createUser: 1,
  //       },
  //     }),
  //   };

  //   const result = await createUserMutation(mockClient, mockVariables);

  //   expect(result).toEqual(1);
  // });

  it('updateGameMutation', async () => {
    const mockVariables = { uid: 100 };

    const mockClient = {
      mutate: () => ({
        data: {
          updateGame: 1,
        },
      }),
    };

    const result = await updateGameMutation(mockClient, mockVariables);

    expect(result).toEqual(1);
  });

  // it('newGameMutation', async () => {
  //   const mockVariables = { uid: 100 };

  //   const mockClient = {
  //     mutate: () => ({
  //       data: {
  //         newGame: 1,
  //       },
  //     }),
  //   };

  //   const result = await newGameMutation(mockClient, mockVariables);

  //   expect(result).toEqual(1);
  // });
});
