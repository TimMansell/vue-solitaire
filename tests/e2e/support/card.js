Cypress.Commands.add('checkSelectedCard', ({ card, isSelected }) => {
  const testClass = isSelected ? 'have.class' : 'not.have.class';
  const shouldExist = isSelected ? 'exist' : 'not.exist';

  cy.get(`[data-test="card-${card}"]`).should(testClass, 'card--is-selected');
  cy.get('[data-card-selected="true"]').should(shouldExist);
});

Cypress.Commands.add('checkCardPosition', ({ card, column, position }) => {
  cy.get(`[data-test="column-${column}"] [data-test^="card"]`)
    .eq(position)
    .then(($card) => $card.attr('data-test'))
    .should('contain', `card-${card}`);
});
