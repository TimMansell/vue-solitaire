import { getLocalUser, createLocalUser } from '../helpers';

const mockUid = 'f5c6a829-f0da-4dfc-81a0-e6419f0163c7';

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
