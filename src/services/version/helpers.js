import { valid, lt } from 'semver';
import { version } from '../../../package.json';

export const getOldVersions = () => {
  const keys = Object.keys(localStorage);
  const legacyVersion = keys.filter((key) => key.includes('vuex'));
  const oldVersion = keys.filter((key) => valid(key) && lt(key, version));

  return [...legacyVersion, ...oldVersion];
};

export const removeVersions = (versions) =>
  versions.reduce((_, currentValue) => {
    localStorage.removeItem(currentValue);

    return true;
  }, '');
