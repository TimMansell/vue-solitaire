Cypress.Commands.add('checkBoardLayout', () => {
  cy.get('[data-test="board"]').should('be.visible');

  cy.getBoardCards().should('have.length', 52);
});

Cypress.Commands.add('checkFoundationLayout', () => {
  cy.get('[data-test="foundations"] [data-test^="foundation-"]').should(
    'have.length',
    4
  );
});

Cypress.Commands.add('checkPlaceholderCardExists', (exists) => {
  const shouldExist = exists ? 'exist' : 'not.exist';

  cy.get('[data-test="columns"] [data-test="column-card-placeholder"]').should(
    shouldExist
  );
});

Cypress.Commands.add('checkPlaceholderCardAtColumn', (column) => {
  cy.get(
    `[data-test="column-${column}"] [data-test="column-card-placeholder"]`
  ).should('be.visible');
});

Cypress.Commands.add('checkBoardIs', (deck) => {
  cy.getBoardCards().each(([currentCard], index) => {
    const { card, test } = currentCard.dataset;
    const { value, suit } = deck.at(index);

    if (!test.includes('hidden')) {
      expect(card).to.equal(`${value}${suit}`);
    }
  });
});

Cypress.Commands.add('checkBoardIsNot', (deck) => {
  cy.getBoardCards().should((cards) => {
    const values = [...cards].map(({ dataset }) => dataset.card);

    const testMatchingDeck = deck.every(({ value, suit }, index) => {
      const card = values.at(index);

      if (!card) return true;

      return card === `${value}${suit}`;
    });

    expect(testMatchingDeck).to.equal(false);
  });
});
