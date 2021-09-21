import fullGameDeck from '../../fixtures/decks/fullGame.json';
import { mockUid } from '../../../src/mockData';

describe('Leaderboards', () => {
  afterEach(() => {
    cy.clearTest();
  });

  describe('Default', () => {
    beforeEach(() => {
      cy.mockApi({
        mockDeck: fullGameDeck,
        mockInitial: true,
      });

      cy.visitApp();
    });

    it('should not show game paused if leaderboards overlay is visible', () => {
      cy.setVisibilityHidden();

      cy.showLeaderboards();

      cy.triggerVisibilityChange();

      cy.checkGamePaused(false);
    });

    it('it should display correct heading', () => {
      cy.showLeaderboards();

      cy.checkLeaderboardHeading('Top 25 Best Moves');

      cy.selectBestItem('Times');

      cy.checkLeaderboardHeading('Top 25 Best Times');

      cy.selectTopItem('50');

      cy.checkLeaderboardHeading('Top 50 Best Times');
    });

    it('it should display correct amount of table rows', () => {
      cy.showLeaderboards();

      cy.checkCorrectTableRows(25);

      cy.selectTopItem('50');

      cy.checkCorrectTableRows(50);
    });

    it('it should display correct table heading', () => {
      cy.showLeaderboards();

      cy.checkTableHeading({ cell: 3, heading: 'Moves' });

      cy.selectBestItem('Times');

      cy.checkTableHeading({ cell: 3, heading: 'Times' });
    });
  });

  describe('New User', () => {
    beforeEach(() => {
      cy.mockApi({
        mockDeck: fullGameDeck,
      });

      cy.visitApp();
    });

    it('it should display player name after first game', () => {
      cy.showLeaderboards();

      cy.checkLeaderboardName(false);

      cy.closeOverlay();

      cy.startNewGame({ waitUser: true });

      cy.showLeaderboards();

      cy.checkLeaderboardName(true);
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

    it('it should display player name after first game', () => {
      cy.showLeaderboards();

      cy.checkLeaderboardName(true);
    });
  });
});
