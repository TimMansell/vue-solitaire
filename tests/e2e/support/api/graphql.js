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
