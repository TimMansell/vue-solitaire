import { getLocalUserID, setLocalUserID, checkLocalUser } from '../localUser';

const luid = 'f5c6a829-f0da-4dfc-81a0-e6419f0163c7';

describe('User', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should get user', () => {
    localStorage.setItem('luid', luid);

    const user = getLocalUserID();

    expect(user).toEqual(luid);
  });

  it('should set user', () => {
    const user = setLocalUserID();

    expect(user).not.toEqual('');
  });

  it('should check user and return true', () => {
    localStorage.setItem('luid', luid);

    const user = checkLocalUser();

    expect(user).toEqual(true);
  });

  it('should check user and return false', () => {
    const user = checkLocalUser();

    expect(user).toEqual(false);
  });
});
