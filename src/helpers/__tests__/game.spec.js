import { gameOutcome } from '../game';

describe('Game Helpers', () => {
  it('should return Won in gameOutcome', () => {
    const result = gameOutcome({ won: true, lost: false });

    expect(result).toBe('Won');
  });

  it('should return Lost in gameOutcome', () => {
    const result = gameOutcome({ won: false, lost: true });

    expect(result).toBe('Lost');
  });

  it('should return Gave Up in gameOutcome', () => {
    const result = gameOutcome({ won: false, lost: false });

    expect(result).toBe('Gave Up');
  });
});
