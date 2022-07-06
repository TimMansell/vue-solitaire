import { getOldVersion } from '../../../../src/services/version';

Cypress.Commands.add('checkHasUpdated', () => {
  const oldVersion = getOldVersion();

  expect(oldVersion).to.equal(undefined);
});
