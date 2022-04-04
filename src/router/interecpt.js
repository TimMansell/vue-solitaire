import store from '@/store';

// eslint-disable-next-line import/prefer-default-export
export const checkUpdate = ([toPath, fromPath], next) => {
  const { isOldVersion } = store.getters;
  const updatePath = '/update';

  if (!isOldVersion && toPath.includes(updatePath)) {
    next('/');
    return true;
  }

  if (isOldVersion && fromPath.includes(updatePath)) {
    next(false);
    return true;
  }

  return false;
};
