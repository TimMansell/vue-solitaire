Cypress.Commands.add('checkCardsNotExistOn', (cards, checkOn) => {
  cards.forEach((card) => {
    cy.get(`[data-test="${checkOn}"] [data-test="card-${card}"]`).should(
      'not.exist'
    );
  });
});

Cypress.Commands.add('checkCardsExistOn', (cards, checkOn) => {
  cards.forEach((card) => {
    cy.get(`[data-test="${checkOn}"] [data-test="card-${card}"]`).should(
      'exist'
    );
  });
});

Cypress.Commands.add('checkCardsNotVisibleOn', (cards, checkOn) => {
  cards.forEach((card) => {
    cy.get(`[data-test="${checkOn}"] [data-test="card-${card}"]`).should(
      'not.be.visible'
    );
  });
});

Cypress.Commands.add('checkCardsVisibleOn', (cards, checkOn) => {
  cards.forEach((card) => {
    cy.get(`[data-test="${checkOn}"] [data-test="card-${card}"]`).should(
      'be.visible'
    );
  });
});

Cypress.Commands.add('checkCardIsSelected', (card) => {
  cy.get(`[data-test="card-${card}"]`).should(
    'have.class',
    'card--is-selected'
  );
  cy.get('[data-card-selected="true"]').should('exist');
});

Cypress.Commands.add('checkCardIsNotSelected', () => {
  cy.get('[data-card-selected="true"]').should('not.exist');
});
