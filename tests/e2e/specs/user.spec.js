import fullGameDeck from '../../fixtures/decks/fullGame.json';
import { mockUid } from '../../../src/mockData';

describe('User', () => {
  afterEach(() => {
    cy.clearTest();
  });

  describe('Default', () => {
    beforeEach(() => {
      cy.visitApp();
    });

    it('it creates a new local user on initial page load', () => {
      const luid = localStorage.getItem('luid');

      // eslint-disable-next-line no-unused-expressions
      expect(luid).to.exist;
      expect(luid).to.not.equal('');
      expect(luid).to.not.equal(mockUid);
    });

    it('it successfully retrieves player count', () => {
      cy.checkPlayerCount();
    });
  });

  describe('New User', () => {
    beforeEach(() => {
      cy.setDeck(fullGameDeck).then(() => {
        cy.visitApp();
      });
    });

    it('it creates a new user on server after first game has been played', () => {
      cy.startNewGame();

      cy.checkPlayerCount();
    });

    it('it does not create a new user on server after second game has been played', () => {
      cy.startNewGame();

      cy.checkPlayerCount();

      cy.startNewGame();

      cy.checkPlayerCount();
    });
  });

  describe('Existing User', () => {
    beforeEach(() => {
      cy.setUser(mockUid);

      cy.setDeck(fullGameDeck).then(() => {
        cy.visitApp();
      });
    });

    it('it does not create a new local user on initial page load', () => {
      const luid = localStorage.getItem('luid');

      expect(luid).to.equal(mockUid);
    });

    it('it does not create a new user on server after first game has been played', () => {
      cy.startNewGame();

      cy.checkPlayerCount();
    });
  });
});
