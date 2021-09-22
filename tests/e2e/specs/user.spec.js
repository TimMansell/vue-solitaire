import fullGameDeck from '../../fixtures/decks/fullGame.json';
import { mockUid, mockNewUid } from '../../../src/mockData';

describe('User', () => {
  afterEach(() => {
    cy.clearTest();
  });

  describe('New User', () => {
    beforeEach(() => {
      cy.task('clearUser', mockNewUid);

      localStorage.setItem('luid', mockNewUid);

      cy.task('populateDeck', [fullGameDeck, mockNewUid]);

      cy.mockApi({
        mockDeck: fullGameDeck,
      });

      cy.visitApp({ waitInitial: true });
    });

    it('it creates a new local user on initial page load', () => {
      const luid = localStorage.getItem('luid');

      // eslint-disable-next-line no-unused-expressions
      expect(luid).to.exist;
      expect(luid).to.not.equal('');
    });

    it('it creates a new user on server after first game has been played', () => {
      cy.savePlayerCount();

      cy.startNewGame({ waitUser: true, waitInitial: true });

      cy.checkPlayerCount({ equal: true, incremented: true });
    });

    it('it does not create a new user on server after second game has been played', () => {
      cy.savePlayerCount();

      cy.startNewGame({ waitUser: true, waitInitial: true });

      cy.checkPlayerCount({ equal: true, incremented: true });

      cy.savePlayerCount();

      cy.startNewGame({ waitInitial: true });

      cy.checkPlayerCount({ equal: true });
    });
  });

  describe('Existing User', () => {
    beforeEach(() => {
      localStorage.setItem('luid', mockUid);

      cy.task('populateDeck', [fullGameDeck, mockUid]);

      cy.mockApi({
        mockDeck: fullGameDeck,
      });

      cy.visitApp({ waitInitial: true });
    });

    it('it does not create a new local user on initial page load', () => {
      const luid = localStorage.getItem('luid');

      expect(luid).to.equal(mockUid);
    });

    it('it does not create a new user on server after first game has been played', () => {
      cy.savePlayerCount();

      cy.startNewGame();

      cy.checkPlayerCount({ equal: true });
    });
  });
});
