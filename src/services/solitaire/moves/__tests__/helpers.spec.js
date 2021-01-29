import { checkEmptyColumns } from '../helpers';

describe('moves', () => {
  describe('empty columns', () => {
    it('should have no empty columns', () => {
      const cards = [[], [], [], [], [], [], [], []];

      const result = checkEmptyColumns(cards);

      expect(result).toBe(false);
    });

    it('should have empty columns', () => {
      const cards = [[], [], [], [], [], [], []];

      const result = checkEmptyColumns(cards);

      expect(result).toBe(true);
    });
  });
});
