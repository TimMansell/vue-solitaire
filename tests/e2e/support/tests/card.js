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

Cypress.Commands.add('checkCardIsNotSelected', (card) => {
  cy.get(`[data-test="card-${card}"]`).should(
    'not.have.class',
    'card--is-selected'
  );
  cy.get('[data-card-selected="true"]').should('not.exist');
});

Cypress.Commands.add('checkCardPositions', (cards) => {
  cards.forEach(({ card, column, position }) => {
    cy.get(`[data-test="column-${column}"] [data-test^="card"]`)
      .eq(position)
      .then(($card) => $card.attr('data-test'))
      .should('contain', `card-${card}`);
  });
});