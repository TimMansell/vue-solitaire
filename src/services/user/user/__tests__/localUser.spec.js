import { getLocalUserID, setLocalUserID, checkLocalUser } from '../localUser';

const mockId = 'f5c6a829-f0da-4dfc-81a0-e6419f0163c7';

describe('User - Local User', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should get user id', () => {
    localStorage.setItem('luid', mockId);

    const id = getLocalUserID();

    expect(id).toEqual(mockId);
  });

  it('should set user id', () => {
    const id = setLocalUserID();

    expect(id).not.toEqual('');
  });

  it('should check user id exists and return true', () => {
    localStorage.setItem('luid', mockId);

    const user = checkLocalUser();

    expect(user).toEqual(true);
  });

  it('should check user exists and return false', () => {
    const user = checkLocalUser();

    expect(user).toEqual(false);
  });
});
