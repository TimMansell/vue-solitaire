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

    return { globalStats, userStats };
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

    return globalStats;
  });
});

Cypress.Commands.add('getUserHistory', ({ offset, limit }) => {
  const url = Cypress.env('graphql');
  const uid = localStorage.getItem('luid');

  const query = `query {
    user(uid: "${uid}") {
      history(offset: ${offset}, limit: ${limit}) {
        number
        date
        time
        outcome
        moves
        duration
      }
    }
  }`;

  cy.request({
    method: 'POST',
    url,
    body: { query },
    failOnStatusCode: false,
  }).then(({ body }) => {
    const {
      data: {
        user: { history },
      },
    } = body;

    return history;
  });
});
