// eslint-disable-next-line import/prefer-default-export
export const setupOnSocket =
  ({ socket, db, io }) =>
  (socketToRun) =>
    socketToRun({ socket, db, io });
