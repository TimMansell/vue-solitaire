const mockUid = 'f5c6a829-f0da-4dfc-81a0-e6419f0163c7';

const getLocalUser = () => localStorage.getItem('luid');

const checkUserExistsOnServer = (uid) => {
  const exists = uid === mockUid;

  return exists;
};

const createUserOnServer = () => true;

const user = () => ({
  getLocalUser,
  checkUserExistsOnServer,
  createUserOnServer,
});

export default user();
