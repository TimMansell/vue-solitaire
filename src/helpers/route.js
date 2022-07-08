// eslint-disable-next-line import/prefer-default-export
export const formatRoute = (route) => {
  const routeType = typeof route;
  const routeObj = routeType.includes('string') ? { name: route } : route;

  return routeObj;
};
