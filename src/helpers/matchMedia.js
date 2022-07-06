import { findValueInObject } from './find';

const breakpoints = { xs: 360, sm: 480, md: 768, lg: 1024, xl: 1366 };

// eslint-disable-next-line import/prefer-default-export
export const matchesMedia = (breakpoint) => {
  const pixels = findValueInObject(breakpoints, ([key]) => key === breakpoint);

  return window.matchMedia(`(min-width: ${pixels}px)`).matches;
};
