const mockUid = '7dac9d78-353f-409b-8a7f-2192409c44a2';

describe('History', () => {
  beforeEach(() => {
    cy.clearLocalStorage();

    cy.intercept('POST', '.netlify/functions/graphql', (req) => {
      const { body } = req;

      if (body?.query.includes('history')) {
        // eslint-disable-next-line no-param-reassign
        req.alias = 'apiCheck';
      }
    });
  });

  describe('Default', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('should not show game paused if history overlay is visible', () => {
      cy.document().then((doc) => {
        cy.stub(doc, 'visibilityState').value('hidden');
      });

      cy.get('[data-test="history-btn"]').click();

      cy.document().trigger('visibilitychange');

      cy.get('[data-test="game-paused"]').should('not.exist');
    });
  });

  describe('New user', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('it shows no game message', () => {
      cy.get('[data-test="history-btn"]').click();

      cy.get('[data-test="game-history"]').should('not.exist');
      cy.get('[data-test="game-history-no-games-msg"]').should('exist');
    });

    it('it shows game history after first game played', () => {
      cy.get('[data-test="new-game-btn"]').click();

      cy.get('[data-test="game-new"]').within(() => {
        cy.get('[data-test="new-game-btn"]').click();
      });

      cy.get('[data-test="history-btn"]').click();

      cy.wait('@apiCheck');

      cy.get('[data-test="table-row"]').should('have.length', 1);
    });
  });

  describe('Existing user', () => {
    beforeEach(() => {
      localStorage.setItem('luid', mockUid);

      cy.visit('/');
    });

    it('it shows 1st page results', () => {
      cy.get('[data-test="history-btn"]').click();

      cy.wait('@apiCheck');

      cy.get('[data-test="table-row"]').should('have.length', 25);

      cy.get('[data-test="pagination"]')
        .children()
        .eq(2)
        .should('have.class', 'pagination__page--is-active');

      cy.get('[data-test="table-row"]:first-child td:first-child').then(
        (cell) => {
          const gameNumber = parseInt(cell.text(), 10);

          cy.get('[data-test="stats"]').should('contain', gameNumber);
        }
      );
    });

    it('it shows 2nd page results using >', () => {
      cy.get('[data-test="history-btn"]').click();

      cy.wait('@apiCheck');

      cy.get('[data-test="table-row"]:last-child td:first-child').then(
        (cell) => {
          const gameNumber = parseInt(cell.text(), 10);

          cy.get('[data-test="pagination"]')
            .contains('>')
            .click();

          cy.wait('@apiCheck');

          cy.get('[data-test="table-row"]:first-child td:first-child').should(
            'contain',
            gameNumber - 1
          );

          cy.get('[data-test="pagination"]')
            .children()
            .eq(3)
            .should('have.class', 'pagination__page--is-active');
        }
      );
    });

    it('it shows 2nd page results using page 2 number button', () => {
      cy.get('[data-test="history-btn"]').click();

      cy.wait('@apiCheck');

      cy.get('[data-test="table-row"]:last-child td:first-child').then(
        (cell) => {
          const gameNumber = parseInt(cell.text(), 10);

          cy.get('[data-test="pagination"]')
            .contains('2')
            .click();

          cy.wait('@apiCheck');

          cy.get('[data-test="table-row"]:first-child td:first-child').should(
            'contain',
            gameNumber - 1
          );

          cy.get('[data-test="pagination"]')
            .children()
            .eq(3)
            .should('have.class', 'pagination__page--is-active');
        }
      );
    });

    it('it shows last page results using Last button', () => {
      cy.get('[data-test="history-btn"]').click();

      cy.wait('@apiCheck');

      cy.get('[data-test="pagination"]')
        .contains('Last')
        .click();

      cy.wait('@apiCheck');

      cy.get('[data-test="table-row"]:last-child td:first-child').should(
        'contain',
        '1'
      );

      cy.get('[data-test="pagination"]')
        .children()
        .eq(-3)
        .should('have.class', 'pagination__page--is-active');
    });

    it('it shows 1st page results using First button', () => {
      cy.get('[data-test="history-btn"]').click();

      cy.wait('@apiCheck');

      cy.get('[data-test="pagination"]')
        .contains('2')
        .click();

      cy.wait('@apiCheck');

      cy.get('[data-test="table-row"]:first-child td:first-child').then(
        (cell) => {
          const gameNumber = parseInt(cell.text(), 10);

          cy.get('[data-test="pagination"]')
            .contains('First')
            .click();

          cy.wait('@apiCheck');

          cy.get('[data-test="table-row"]:last-child td:first-child').should(
            'contain',
            gameNumber + 1
          );

          cy.get('[data-test="pagination"]')
            .children()
            .eq(2)
            .should('have.class', 'pagination__page--is-active');
        }
      );
    });

    it('it shows 1st page results using < button', () => {
      cy.get('[data-test="history-btn"]').click();

      cy.wait('@apiCheck');

      cy.get('[data-test="pagination"]')
        .contains('2')
        .click();

      cy.wait('@apiCheck');

      cy.get('[data-test="table-row"]:first-child td:first-child').then(
        (cell) => {
          const gameNumber = parseInt(cell.text(), 10);

          cy.get('[data-test="pagination"]')
            .contains('<')
            .click();

          cy.wait('@apiCheck');

          cy.get('[data-test="table-row"]:last-child td:first-child').should(
            'contain',
            gameNumber + 1
          );

          cy.get('[data-test="pagination"]')
            .find('.pagination__page--is-active')
            .should('contain', 1);
        }
      );
    });

    it('it shows 50 games per page', () => {
      cy.get('[data-test="history-btn"]').click();

      cy.wait('@apiCheck');

      cy.get('[data-test="table-row"]').should('have.length', 25);

      cy.get('[data-test="game-history"] [data-test="select"]').select('50');

      cy.wait('@apiCheck');

      cy.get('[data-test="table-row"]').should('have.length', 50);
    });

    it('it shows page one when games per page is changed', () => {
      cy.get('[data-test="history-btn"]').click();

      cy.wait('@apiCheck');

      cy.get('[data-test="pagination"]')
        .contains('Last')
        .click();

      cy.wait('@apiCheck');

      cy.get('[data-test="game-history"] [data-test="select"]').select('50');

      cy.wait('@apiCheck');

      cy.get('[data-test="pagination"]')
        .children()
        .eq(2)
        .should('have.class', 'pagination__page--is-active');
    });

    it('it should scroll to correct position on page after clicking on page', () => {
      cy.get('[data-test="history-btn"]').click();

      cy.wait('@apiCheck');

      cy.get('[data-test="pagination"]')
        .contains('2')
        .click();

      cy.wait('@apiCheck');

      cy.get('[data-test="game-history-controls"]').should('be.visible');
    });
  });
});
