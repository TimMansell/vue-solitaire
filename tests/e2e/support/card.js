Cypress.Commands.add('checkSelectedCard', ({ card, isSelected }) => {
  const testClass = isSelected ? 'have.class' : 'not.have.class';

  cy.get(`[data-test="card-${card}"]`).should(testClass, 'card--is-selected');
});

Cypress.Commands.add('checkCard', ({ card, column, position }) => {
  cy.get(`[data-test="column-${column}"] [data-test^="card"]`)
    .eq(position)
    .then(($card) => $card.attr('data-test'))
    .should('contain', `card-${card}`);
});
