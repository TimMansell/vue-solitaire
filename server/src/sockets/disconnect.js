// eslint-disable-next-line import/prefer-default-export
export const disconnect = ({ socket }) => {
  socket.on('disconnect', () => {
    socket.removeAllListeners();

    console.log('Client disconnected.', socket.id);
  });
};
