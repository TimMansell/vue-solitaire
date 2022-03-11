import semver from 'semver';
import { version } from '../../../../package.json';

Cypress.Commands.add('mockVersionUpdate', () =>
  cy
    .window()
    .its('solitaire.$store')
    .then((store) => {
      store.dispatch('checkVersion', semver.inc(version, 'patch'));
    })
);

Cypress.Commands.add('mockIsOnline', (isOnline) =>
  cy
    .window()
    .its('solitaire.$store')
    .then((store) => {
      store.dispatch('setIsOnline', isOnline);
    })
);
