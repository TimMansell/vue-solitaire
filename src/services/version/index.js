import { getOldVersions, removeVersions } from './helpers';

export const checkIsOldVersion = () => {
  const oldVersions = getOldVersions();
  const isOldVersion = oldVersions.length > 0;

  return isOldVersion;
};

export const updateVersion = () => {
  const oldVersions = getOldVersions();
  const hasUpdated = removeVersions(oldVersions);

  return hasUpdated;
};
