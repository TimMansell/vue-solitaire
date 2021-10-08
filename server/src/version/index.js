import 'dotenv/config';
import { version } from '../../package.json';

// eslint-disable-next-line import/prefer-default-export
export const checkVersion = (localVersion) => {
  const matches = version === localVersion || localVersion === null;

  return { version, matches };
};
