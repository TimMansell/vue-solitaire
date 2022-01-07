Cypress.Commands.add('getInitialData', () => {
  const url = Cypress.env('graphql');
  const uid = localStorage.getItem('luid');

  const query = `query {
    userStats(uid: "${uid}") {
      completed
    }
    globalStats {
      completed
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
      data: { globalStats, userStats },
    } = body;

    console.log({ body });

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

Cypress.Commands.add('getLeaderboards', ({ best, limit }) => {
  const url = Cypress.env('graphql');

  const query = `query {
    leaderboards(offset: 0, limit: ${limit}) {
      ${best} {
        rank
        player
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
  }).then(({ body }) => body.data.leaderboards[best]);
});
