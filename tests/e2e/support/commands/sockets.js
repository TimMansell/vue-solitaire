import numeral from 'numeral';

Cypress.Commands.add('getPlayerCount', () =>
  cy.task('sendMsg', { name: 'playerCount' }).then((payload) => payload)
);

Cypress.Commands.add('getStats', () => {
  const uid = localStorage.getItem('luid');

  cy.task('sendMsg', {
    name: 'stats',
    payload: { uid },
  }).then(({ userStats, globalStats }) => {
    const [user] = userStats;
    const [global] = globalStats;

    return {
      user: user.map((stat) => numeral(stat).value()),
      global: global.map((stat) => numeral(stat).value()),
    };
  });
});
