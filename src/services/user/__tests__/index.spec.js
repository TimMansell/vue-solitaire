import { mockUid } from '@/mockData';
import { initUser } from '../index';

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
