export const findExistsInObject = (items, findBy) => {
  const value = Object.entries(items).find(findBy) || [];

  return value.length > 0;
};

export const findValueInObject = (items, findBy) =>
  Object.entries(items).find(findBy)?.at(1);
