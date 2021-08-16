import mutations from '../mutations';

const { SET_USER_ID, SET_USER_EXISTS } = mutations;

const mockUid = 'f5c6a829-f0da-4dfc-81a0-e6419f0163c7';

describe('User Store', () => {
  it('SET_USER_ID', () => {
    const luid = mockUid;
    const state = { luid };

    SET_USER_ID(state, luid);

    expect(state.luid).toEqual(luid);
  });

  it('SET_USER_EXISTS', () => {
    const isUserSavedOnServer = true;
    const state = { isUserSavedOnServer };

    SET_USER_EXISTS(state, isUserSavedOnServer);

    expect(state.isUserSavedOnServer).toEqual(isUserSavedOnServer);
  });
});
