import { mockVersionNumber } from '../../../src/mockData';
import { version } from '../../../package.json';

const defaultAlias = 'version';
const mockAlias = 'mockVersion';

describe('App', () => {
  describe('Default', () => {
    beforeEach(() => {
      cy.clearLocalStorage();

      cy.visit('/');
    });

    it('it successfullly loads', () => {
      cy.get('[data-test="board"]').should('be.visible');

      cy.interceptStatsAPI();

      cy.wait('@waitForStatsAPI');

      cy.get('[data-test="columns"]').within(() => {
        cy.get('[data-test^="card-"]').should('have.length', 52);
      });

      cy.get('[data-test="foundations"]').within(() => {
        cy.get('[data-test^="foundation-"]').should('have.length', 4);
      });
    });

    it('it should hide scroll bar when overlay is open and show scrollbar when overlay is closed', () => {
      cy.get('[data-test="pause-game-btn"]').click();

      cy.get('[data-test="body"]').should('have.css', 'overflow', 'hidden');

      cy.get('[data-test="game-overlay-btns"]').within(() => {
        cy.get('[data-test="pause-game-btn"]').click();
      });

      cy.get('[data-test="body"]').should('have.css', 'overflow', 'auto');
    });
  });

  describe('Version', () => {
    it('it should not show version upgrade toast', () => {
      cy.interceptVersionCheck(defaultAlias, version);

      cy.visit('/');

      cy.wait(`@${defaultAlias}`);

      cy.get('[data-test="version"]').should('not.exist');
    });

    it('it should show version upgrade toast', () => {
      cy.interceptVersionCheck(mockAlias, mockVersionNumber);

      cy.visit('/');

      cy.wait(`@${mockAlias}`);

      cy.get('[data-test="version"]').should('exist');
    });

    it('it should show version upgrade toast and not show it after page reload', () => {
      cy.interceptVersionCheck(mockAlias, mockVersionNumber);

      cy.visit('/');

      cy.wait(`@${mockAlias}`);

      cy.get('[data-test="version"]').should('exist');

      cy.interceptVersionCheck(defaultAlias, version);

      cy.reload();

      cy.wait(`@${defaultAlias}`);

      cy.get('[data-test="version"]').should('not.exist');
    });
  });
});
