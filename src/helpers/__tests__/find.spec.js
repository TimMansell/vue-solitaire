import { findExistsInObject, findValueInObject } from '../find';

const obj = { heading: 'Test Heading', text: 'Test Text' };

describe('Find Helpers', () => {
  it('should exist in object', () => {
    const result = findExistsInObject(obj, ([key]) => key === 'heading');

    expect(result).toEqual(true);
  });

  it('should not exist in object', () => {
    const result = findExistsInObject(obj, ([key]) => key === 'wins');

    expect(result).toEqual(false);
  });

  it('should find value in object', () => {
    const result = findValueInObject(obj, ([key]) => key === 'text');

    expect(result).toEqual(obj.text);
  });

  it('should not find value in object', () => {
    const result = findValueInObject(obj, ([key]) => key === 'wins');

    expect(result).toEqual(undefined);
  });
});
