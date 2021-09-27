Cypress.Commands.add('interceptAPIs', () => {
  const url = Cypress.env('graphql');
  const interceptAPI = (request, operationName) => {
    const { body } = request;

    if (body?.operationName === operationName) {
      // eslint-disable-next-line no-param-reassign
      request.alias = `${operationName}API`;
    }
  };

  cy.intercept('POST', url, (request) => {
    interceptAPI(request, 'GetInitialData');
    interceptAPI(request, 'CreateAUser');
    interceptAPI(request, 'NewGame');
    interceptAPI(request, 'GetStats');
    interceptAPI(request, 'Leaderboards');
    interceptAPI(request, 'UserHistory');
  });
});
