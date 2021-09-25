Cypress.Commands.add('getStats', () => {
  const uid = localStorage.getItem('luid');

  const query = `query {
    userStats(uid: "${uid}") {
      won
      lost
      completed
    }
    globalStats {
      won
      lost
      completed
    }
  }`;

  cy.request({
    method: 'POST',
    url: '.netlify/functions/graphql',
    body: { query },
    failOnStatusCode: false,
  }).then(({ body }) => {
    const {
      data: { globalStats, userStats },
    } = body;

    cy.wrap(userStats).as('userStats');
    cy.wrap(globalStats).as('globalStats');
  });
});
