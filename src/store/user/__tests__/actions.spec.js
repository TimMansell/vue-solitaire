import { mockUid } from '@/mockData';
import actions from '../actions';

const { initUser } = actions;

vi.mock('@/services/ws');

describe('User Store', () => {
  let commit;

  beforeEach(() => {
    localStorage.clear();

    commit = vi.fn();
  });

  describe('initUser', () => {
    it('should create a new user id', () => {
      const state = {
        luid: mockUid,
      };

      initUser({ commit, state });

      expect(commit).toHaveBeenCalledWith('SET_USER_ID', mockUid);
    });

    it('should get user id from local storage', () => {
      const state = {};

      localStorage.setItem('luid', mockUid);

      initUser({ commit, state });

      expect(commit).toHaveBeenCalledWith('SET_USER_ID', mockUid);
    });
  });
});
