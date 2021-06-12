import actions from '../actions';

const {
  initLocalUser,
  initServerUser,
  checkUserExistsOnServer,
  getAllGames,
} = actions;

const mockUid = 'f5c6a829-f0da-4dfc-81a0-e6419f0163c7';
const mockHistory = [
  {
    date: '2021-05-20T23:34:49.564Z',
    won: false,
    lost: false,
    moves: 0,
    time: 12,
  },
];

let commit;
let dispatch;

jest.mock('@/services/user');

describe('User Store', () => {
  beforeEach(() => {
    localStorage.clear();

    commit = jest.fn();
    dispatch = jest.fn();
  });

  describe('initLocalUser', () => {
    it('should create a new user', async () => {
      localStorage.setItem('luid', mockUid);

      await initLocalUser({ commit });

      expect(commit).toHaveBeenCalledWith('SET_USER_ID', mockUid);
    });
  });

  describe('initServerUser', () => {
    it('should not create a new server user when app loads', async () => {
      const state = {
        isUserSavedOnServer: false,
        hasUserPlayedAGame: false,
      };

      await initServerUser({ dispatch, state });

      expect(dispatch).not.toHaveBeenCalledWith('checkUserExistsOnServer');
    });

    it('should not create a new server user for an existing user when app loads', async () => {
      const state = {
        isUserSavedOnServer: true,
        hasUserPlayedAGame: false,
      };

      await initServerUser({ dispatch, state });

      expect(dispatch).not.toHaveBeenCalledWith('checkUserExistsOnServer');
    });

    it('should create a new server user after first game', async () => {
      const state = {
        isUserSavedOnServer: false,
        hasUserPlayedAGame: true,
      };

      await initServerUser({ dispatch, state });

      expect(dispatch).toHaveBeenCalledWith('checkUserExistsOnServer');
    });

    it('should not create a new server user (user already exists) after first game', async () => {
      const state = {
        isUserSavedOnServer: true,
        hasUserPlayedAGame: true,
      };

      await initServerUser({ dispatch, state });

      expect(dispatch).not.toHaveBeenCalledWith('checkUserExistsOnServer');
    });
  });

  describe('checkUserExistsOnServer', () => {
    it('should return an existing user', async () => {
      const luid = '123';

      const state = {
        luid,
      };

      await checkUserExistsOnServer({ commit, dispatch, state });

      expect(dispatch).toHaveBeenCalledWith('createUserOnServer', luid);
    });

    it('should return no existing user', async () => {
      const state = {
        luid: mockUid,
      };

      await checkUserExistsOnServer({ commit, dispatch, state });

      expect(dispatch).not.toHaveBeenCalledWith('createUserOnServer');
    });
  });

  describe('getAllGames', () => {
    it('should games', async () => {
      const state = {
        luid: mockUid,
      };

      const params = { offset: 0, limit: 25 };

      await getAllGames({ commit, state }, params);

      expect(commit).toHaveBeenCalledWith('SET_USER_GAMES', mockHistory);
    });
  });
});
