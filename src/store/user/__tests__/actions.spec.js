import { mockUid } from '@/mockData';
import actions from '../actions';

const { setUser } = actions;

jest.mock('@/services/ws');

describe('User Store', () => {
  let commit;

  beforeEach(() => {
    localStorage.clear();

    commit = jest.fn();
  });

  describe('setUser', () => {
    it('should create a new user id', () => {
      const state = {
        luid: mockUid,
      };

      setUser({ commit, state });

      expect(commit).toHaveBeenCalledWith('SET_USER_ID', mockUid);
    });

    it('should get user id from local storage', () => {
      const state = {};

      localStorage.setItem('luid', mockUid);

      setUser({ commit, state });

      expect(commit).toHaveBeenCalledWith('SET_USER_ID', mockUid);
    });
  });
});
