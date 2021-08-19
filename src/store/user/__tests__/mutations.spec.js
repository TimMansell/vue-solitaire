import { mockUid } from '@/mockData';
import mutations from '../mutations';

const { SET_USER_ID, SET_USER_EXISTS } = mutations;

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
