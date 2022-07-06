Cypress.Commands.add('getBoardCards', () =>
  cy.get('[data-test="columns"] [data-test^="card-"]')
);
