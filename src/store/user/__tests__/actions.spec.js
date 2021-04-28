import actions from '../actions';

const { initUser } = actions;

const mockUid = 'f5c6a829-f0da-4dfc-81a0-e6419f0163c7';

const commit = jest.fn();
const dispatch = jest.fn();

jest.mock('@/services/user');

describe('User Store', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should not create a new user', async () => {
    localStorage.setItem('luid', mockUid);

    await initUser({ commit, dispatch });

    expect(dispatch).not.toHaveBeenCalledWith('createUser', mockUid);
  });

  it('should create a new user', async () => {
    localStorage.setItem('luid', '123');

    await initUser({ commit, dispatch });

    expect(dispatch).toHaveBeenCalledWith('createUser', '123');
  });
});
