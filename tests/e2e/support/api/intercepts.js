Cypress.Commands.add('interceptAPIs', () => {
  const interceptAPI = (request, operationName) => {
    const { body } = request;

    if (body?.operationName === operationName) {
      // eslint-disable-next-line no-param-reassign
      request.alias = `${operationName}API`;
    }
  };

  cy.intercept('POST', '.netlify/functions/graphql', (request) => {
    interceptAPI(request, 'GetInitialData');
    interceptAPI(request, 'CreateAUser');
    interceptAPI(request, 'NewGame');
    interceptAPI(request, 'GetStats');
    interceptAPI(request, 'Leaderboards');
    interceptAPI(request, 'UserHistory');
  });
});
