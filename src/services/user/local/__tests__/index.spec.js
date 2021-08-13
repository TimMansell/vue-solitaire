import { initUser } from '../index';

const mockUid = 'f5c6a829-f0da-4dfc-81a0-e6419f0163c7';

jest.mock('@/services/db');

jest.mock('uuid', () => ({
  v4: () => mockUid,
}));

describe('User', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('initUser', () => {
    it('should get user id from localStorage', () => {
      localStorage.setItem('luid', mockUid);

      const luid = initUser();

      expect(luid).toBe(mockUid);
    });

    it('should set user id in localStorage', () => {
      const luid = initUser();
      const luidStorage = localStorage.getItem('luid');

      expect(luid).toBe(mockUid);
      expect(luidStorage).toBe(mockUid);
    });
  });
});
