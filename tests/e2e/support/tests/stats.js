Cypress.Commands.add('checkGameCount', (number) => {
  cy.get('[data-test="user-games"]').formatNumber().should('equal', number);
});

Cypress.Commands.add('checkGlobalGameCount', (number) => {
  cy.get('[data-test="global-stats"]').formatNumber().should('equal', number);
});

Cypress.Commands.add('checkStats', () => {
  const uid = localStorage.getItem('luid');

  cy.showStats();

  cy.task('getStats', { uid }).then(({ completed, won, lost, quit }) => {
    cy.get('[data-test="user-stats"] [data-test="table-cell"]').as('userStats');

    cy.get('@userStats').eq(0).formatNumber().should('equal', completed);
    cy.get('@userStats').eq(1).formatNumber().should('equal', won);
    cy.get('@userStats').eq(2).formatNumber().should('equal', lost);
    cy.get('@userStats').eq(3).formatNumber().should('equal', quit);
  });

  cy.task('getStats').then(({ completed, won, lost, quit }) => {
    cy.get('[data-test="global-stats"] [data-test="table-cell"]').as(
      'globalStats'
    );

    cy.get('@globalStats').eq(0).formatNumber().should('equal', completed);
    cy.get('@globalStats').eq(1).formatNumber().should('equal', won);
    cy.get('@globalStats').eq(2).formatNumber().should('equal', lost);
    cy.get('@globalStats').eq(3).formatNumber().should('equal', quit);
  });

  cy.closeOverlay();
});

Cypress.Commands.add('checkUserStatsAreZero', () => {
  cy.showStats();

  cy.get('[data-test="user-stats"] [data-test="table-cell"]').as('userStats');

  cy.get('@userStats').eq(0).formatNumber().should('equal', 0);
  cy.get('@userStats').eq(1).formatNumber().should('equal', 0);
  cy.get('@userStats').eq(2).formatNumber().should('equal', 0);
  cy.get('@userStats').eq(3).formatNumber().should('equal', 0);

  cy.closeOverlay();
});
