// eslint-disable-next-line import/prefer-default-export
export const disconnectSocket = ({ socket }) => {
  socket.on('disconnect', () => {
    socket.removeAllListeners();

    console.log('Client disconnected.', socket.id);
  });
};
