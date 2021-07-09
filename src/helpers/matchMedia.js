const breakpoints = { xs: 360, sm: 480, md: 768, lg: 1024, xl: 1366 };

export const matchMedia = (media) =>
  window.matchMedia(`(min-width: ${media}px)`).matches;

export const matchesMedia = (breakpoint) => matchMedia(breakpoints[breakpoint]);
