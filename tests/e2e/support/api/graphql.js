Cypress.Commands.add('getStats', () => {
  const url = Cypress.env('graphql');
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
    url,
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

Cypress.Commands.add('getPlayerCount', () => {
  const url = Cypress.env('graphql');
  const query = `query {
    globalStats {
      players
    }
  }`;

  cy.request({
    method: 'POST',
    url,
    body: { query },
    failOnStatusCode: false,
  }).then(({ body }) => {
    const {
      data: { globalStats },
    } = body;

    cy.wrap(globalStats).as('playerCount');
  });
});
