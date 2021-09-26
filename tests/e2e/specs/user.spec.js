import fullGameDeck from '../../fixtures/decks/fullGame.json';
import { mockUid } from '../../../src/mockData';

describe('User', () => {
  afterEach(() => {
    cy.clearTest();
  });

  describe('Default', () => {
    beforeEach(() => {
      cy.mockApi({
        mockDeck: fullGameDeck,
      });

      cy.visitApp();
    });

    it('it creates a new local user on initial page load', () => {
      const luid = localStorage.getItem('luid');

      // eslint-disable-next-line no-unused-expressions
      expect(luid).to.exist;
      expect(luid).to.not.equal('');
      expect(luid).to.not.equal(mockUid);
    });
  });

  describe('New User', () => {
    beforeEach(() => {
      cy.mockApi({
        mockDeck: fullGameDeck,
      });

      cy.visitApp();

      cy.setDeck(fullGameDeck);
    });

    it('it creates a new user on server after first game has been played', () => {
      cy.savePlayerCount();

      cy.startNewGame({ waitUser: true });

      cy.checkPlayerCountHasIncremented(true);
    });

    it('it does not create a new user on server after second game has been played', () => {
      cy.savePlayerCount();

      cy.startNewGame({ waitUser: true });

      cy.checkPlayerCountHasIncremented(true);

      cy.savePlayerCount();

      cy.startNewGame();

      cy.checkPlayerCountHasIncremented(false);
    });
  });

  describe('Existing User', () => {
    beforeEach(() => {
      cy.setUser(mockUid);

      cy.mockApi({
        mockDeck: fullGameDeck,
      });

      cy.visitApp();

      cy.setDeck(fullGameDeck);
    });

    it('it does not create a new local user on initial page load', () => {
      const luid = localStorage.getItem('luid');

      expect(luid).to.equal(mockUid);
    });

    it('it does not create a new user on server after first game has been played', () => {
      cy.savePlayerCount();

      cy.startNewGame();

      cy.checkPlayerCountHasIncremented(false);
    });
  });
});
