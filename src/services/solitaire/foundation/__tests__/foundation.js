import {
  initFoundations,
  checkEmptyFoundationColumn,
  checkFoundationColumnSuit,
  getFoundationColumn,
} from '../foundation';
import settings from '../../settings.json';

describe('foundation', () => {
  it('should init foundation', () => {
    const result = initFoundations(settings);

    expect(result).toStrictEqual([[], [], [], []]);
  });

  it('should return empty column', () => {
    const foundationColumn = [];

    const result = checkEmptyFoundationColumn(foundationColumn);

    expect(result).toBe(true);
  });

  it('should return full column', () => {
    const foundationColumn = [
      {
        id: 1,
        suit: '♠',
        value: 'A',
      },
    ];

    const result = checkEmptyFoundationColumn(foundationColumn);

    expect(result).toBe(false);
  });

  it('should be a correct column suit', () => {
    const foundationColumn = [
      {
        id: 1,
        suit: '♠',
        value: 'A',
      },
    ];

    const selectedCard = {
      id: 1,
      suit: '♠',
      value: 2,
    };

    const result = checkFoundationColumnSuit(foundationColumn, selectedCard);

    expect(result).toBe(true);
  });

  it('should be an incorrect column suit', () => {
    const foundationColumn = [
      {
        id: 1,
        suit: '♠',
        value: 'A',
      },
    ];

    const selectedCard = {
      id: 1,
      suit: '♦',
      value: 2,
    };

    const result = checkFoundationColumnSuit(foundationColumn, selectedCard);

    expect(result).toBe(false);
  });

  it('should return passed column no', () => {
    const foundationColumnNo = 2;

    const result = getFoundationColumn(foundationColumnNo);

    expect(result).toBe(2);
  });

  it('should return first column', () => {
    const foundationColumnNo = -1;

    const result = getFoundationColumn(foundationColumnNo);

    expect(result).toBe(0);
  });
});
