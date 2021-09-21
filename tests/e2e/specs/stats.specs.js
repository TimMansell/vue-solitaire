import fullGameDeck from '../../fixtures/decks/fullGame.json';
import { mockUid, mockNewUid } from '../../../src/mockData';

describe('Stats', () => {
  afterEach(() => {
    cy.clearTest();
  });

  describe('Default', () => {
    beforeEach(() => {
      localStorage.setItem('luid', mockNewUid);

      cy.mockApi({
        mockDeck: fullGameDeck,
        mockInitial: true,
        mockSaveGame: true,
        mockCreateUser: true,
        mockGetUser: true,
      });

      cy.visitApp();
    });

    it('should not show game paused if user stats overlay is visible', () => {
      cy.setVisibilityHidden();

      cy.showStats();

      cy.triggerVisibilityChange();

      cy.checkGamePaused(false);
    });

    it('it successfully retrieves player count', () => {
      cy.get('[data-test="player-count"]')
        .text()
        .should('not.equal', '0');
    });
  });

  describe('New User', () => {
    it('it successfully retrieves 0 games played', () => {
      cy.mockApi({
        mockDeck: fullGameDeck,
      });

      cy.visitApp();

      cy.checkGameNumber(0);

      cy.showStats();

      cy.checkStats({ stat: 'user', values: [0, 0, 0, 0] });
      cy.checkStats({ stat: 'global', values: [0, 0, 0, 0], not: true });
    });

    it('it successfully increments games played', () => {
      cy.task('clearUser', mockNewUid);

      localStorage.setItem('luid', mockNewUid);

      cy.task('populateDeck', [fullGameDeck, mockUid]);

      cy.mockApi({
        mockDeck: fullGameDeck,
      });

      cy.visitApp();

      cy.saveStats();
      cy.saveGames();

      cy.startNewGame();

      cy.showStats();

      cy.checkAllStats({ played: true, quit: true });
    });
  });

  describe('Existing User', () => {
    beforeEach(() => {
      localStorage.setItem('luid', mockUid);

      cy.mockApi({
        mockDeck: fullGameDeck,
      });

      cy.visitApp();
    });

    it('it successfully retrieves games played', () => {
      cy.get('[data-test="stats"]').should('not.have.text', '0');

      cy.showStats();

      cy.checkStats({ stat: 'user', values: [0, 0, 0, 0], not: true });
      cy.checkStats({ stat: 'global', values: [0, 0, 0, 0], not: true });
    });

    it('it successfully increments games played', () => {
      cy.saveStats();
      cy.saveGames();

      cy.startNewGame();

      cy.showStats();

      cy.checkAllStats({ played: true, quit: true });
    });
  });
});
