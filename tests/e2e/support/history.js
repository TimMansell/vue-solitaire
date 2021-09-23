Cypress.Commands.add('setHistoryPage', (pageText) => {
  cy.setPage(pageText);

  cy.wait('@waitForHistoryAPI');
});

Cypress.Commands.add('selectGamesItem', (value) => {
  cy.get('[data-test="game-history"] [data-test="select"]').select(value);

  cy.wait('@waitForHistoryAPI');
});

Cypress.Commands.add('checkGameRange', () => {
  cy.get('[data-test="pagination"]')
    .find('.pagination__page--is-active')
    .saveNumberAs('page');

  cy.get(
    '[data-test="game-history"] [data-test="select"] :selected'
  ).saveNumberAs('itemsPerPage');

  cy.get('[data-test="table-row"]:first-child td:first-child').saveNumberAs(
    'firstRow'
  );

  cy.get('[data-test="table-row"]:last-child td:first-child').saveNumberAs(
    'lastRow'
  );

  cy.get('[data-test="game-history-total-games"]')
    .then(($value) => $value.attr('data-games'))
    .then((games) => {
      cy.get('@page').then((page) => {
        cy.get('@itemsPerPage').then((items) => {
          cy.get('@firstRow').then((firstRow) => {
            expect(firstRow).to.equal(games - (page - 1) * items);
          });

          cy.get('@lastRow').then((lastRow) => {
            expect(lastRow).to.equal(games - page * items + 1);
          });
        });
      });
    });
});

Cypress.Commands.add('checkCorrectPages', () => {
  cy.get('[data-test="pagination"]')
    .find('.pagination__page--is-active')
    .saveNumberAs('page');

  cy.get(
    '[data-test="game-history"] [data-test="select"] :selected'
  ).saveNumberAs('itemsPerPage');

  cy.get('[data-test="game-history-total-games"]')
    .then(($value) => $value.attr('data-games'))
    .then((games) => {
      cy.get('@page').then((page) => {
        cy.get('@itemsPerPage').then((items) => {
          const pages = Math.ceil(games / items);

          cy.get('[data-test="game-history-pages"]').should(
            'contain',
            `${page} / ${pages}`
          );
        });
      });
    });
});

Cypress.Commands.add('checkGameMoves', () => {
  cy.get('@moves').then((moves) => {
    cy.get('[data-test="table-row"] td')
      .eq(4)
      .text()
      .should('equal', moves);
  });
});

Cypress.Commands.add('checkGameTime', () => {
  const [timer] = JSON.parse(localStorage.getItem('timers'));

  cy.get(`@${timer}`).then((time) => {
    cy.get('[data-test="table-row"] td')
      .eq(5)
      .text()
      .should('equal', time);
  });
});

Cypress.Commands.add('checkHistoryExists', (exists) => {
  const shouldExist = exists ? 'exist' : 'not.exist';

  cy.get('[data-test="game-history"]').should(shouldExist);
});

Cypress.Commands.add('checkGameMessageExists', (exists) => {
  const shouldExist = exists ? 'exist' : 'not.exist';

  cy.get('[data-test="game-history-no-games-msg"]').should(shouldExist);
});

Cypress.Commands.add('checkCorrectShowingGames', () => {
  cy.get('[data-test="table-row"]:first-child td:first-child').saveNumberAs(
    'firstRow'
  );

  cy.get('[data-test="table-row"]:last-child td:first-child').saveNumberAs(
    'lastRow'
  );

  cy.get('@firstRow').then((firstRow) => {
    cy.get('@lastRow').then((lastRow) => {
      cy.get('[data-test="game-history-showing-games"]').should(
        'contain',
        `Showing games ${firstRow} to ${lastRow}`
      );
    });
  });
});
