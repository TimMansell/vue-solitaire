Cypress.Commands.add('checkGameCount', (number) => {
  cy.get('[data-test="user-games"]').formatNumber().should('equal', number);
});

Cypress.Commands.add('checkGlobalGameCount', (number) => {
  cy.get('[data-test="global-stats"]').formatNumber().should('equal', number);
});

Cypress.Commands.add(
  'checkStatsAre',
  ({ user, global }, increment = [0, 0, 0, 0]) => {
    const [completed, won, lost, quit] = user;
    const [completedGlobal, wonGlobal, lostGlobal, quitGlobal] = global;
    const [completedInc, winInc, lostInc, quitInc] = increment;

    cy.showStats();

    cy.get('[data-test="user-stats"] [data-test="table-cell"]').as('userStats');
    cy.get('[data-test="global-stats"] [data-test="table-cell"]').as(
      'globalStats'
    );

    cy.get('@userStats')
      .eq(0)
      .formatNumber()
      .should('equal', completed + completedInc);

    cy.get('@userStats')
      .eq(1)
      .formatNumber()
      .should('equal', won + winInc);

    cy.get('@userStats')
      .eq(2)
      .formatNumber()
      .should('equal', lost + lostInc);

    cy.get('@userStats')
      .eq(3)
      .formatNumber()
      .should('equal', quit + quitInc);

    cy.get('@globalStats')
      .eq(0)
      .formatNumber()
      .should('equal', completedGlobal + completedInc);

    cy.get('@globalStats')
      .eq(1)
      .formatNumber()
      .should('equal', wonGlobal + winInc);

    cy.get('@globalStats')
      .eq(2)
      .formatNumber()
      .should('equal', lostGlobal + lostInc);

    cy.get('@globalStats')
      .eq(3)
      .formatNumber()
      .should('equal', quitGlobal + quitInc);

    cy.closeOverlay();
  }
);
