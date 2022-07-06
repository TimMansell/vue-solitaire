const addEventListener = (events) => {
  const eventNames = Object.entries(events);

  const addEvents = eventNames.map(([name, event]) => {
    window.addEventListener(name, event);

    return { name, event };
  });

  return addEvents;
};

const removeEventListener = (events) =>
  events.forEach(({ name, event }) => window.removeEventListener(name, event));

export { addEventListener, removeEventListener };
