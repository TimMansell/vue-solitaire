export const setupOnSocket =
  ({ socket, db, io }) =>
  (socketToRun) =>
    socketToRun({ socket, db, io });

export const disconnectSocket = ({ socket }) => {
  socket.on('disconnect', () => {
    socket.removeAllListeners();

    console.log('Client disconnected.', socket.id);
  });
};
