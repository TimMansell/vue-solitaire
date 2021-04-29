import {
  getLocalUser,
  checkUserExistsOnServer,
  createUserOnServer,
} from './user';

const user = () => ({
  getLocalUser,
  checkUserExistsOnServer,
  createUserOnServer,
});

export default user();
