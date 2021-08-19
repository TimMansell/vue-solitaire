import { mockUid } from '@/mockData';
import { getLocalUser, createLocalUser } from '../helpers';

describe('User - Local User', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should get user id', () => {
    localStorage.setItem('luid', mockUid);

    const luid = getLocalUser();

    expect(luid).not.toBe('');
    expect(luid).toBe(mockUid);
  });

  it('should set user id', () => {
    const luid = createLocalUser();

    expect(luid).not.toBe('');
    expect(luid).not.toBe(mockUid);
  });
});
