import { mockUid, mockHistory, mockPlayerName } from '@/mockData';
import actions from '../actions';

const { initUser, createUser, getAllGames } = actions;

jest.mock('@/services/ws');

describe('User Store', () => {
  let commit;
  let dispatch;

  beforeEach(() => {
    localStorage.clear();

    commit = jest.fn();
    dispatch = jest.fn();
  });

  describe('initUser', () => {
    it('should create a new user id', async () => {
      const state = {
        luid: mockUid,
      };

      await initUser({ commit, state });

      expect(commit).toHaveBeenCalledWith('SET_USER_ID', mockUid);
    });

    it('should get user id from local storage', async () => {
      const state = {
        luid: mockUid,
      };

      localStorage.setItem('luid', mockUid);

      await initUser({ commit, state });

      expect(commit).toHaveBeenCalledWith('SET_USER_ID', mockUid);
    });
  });

  describe('createUser', () => {
    it('should return an existing user name for user who does not have lastest store', async () => {
      const state = {
        luid: mockUid,
        existsOnServer: false,
      };

      await createUser({ dispatch, state });

      expect(dispatch).toHaveBeenCalledWith('setUser', {
        name: mockPlayerName,
      });
    });

    it('should return a new user name', async () => {
      const state = {
        luid: '123',
        existsOnServer: false,
      };

      await createUser({ dispatch, state });

      expect(dispatch).toHaveBeenCalledWith('setUser', {
        name: 'New Player Name',
      });
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
