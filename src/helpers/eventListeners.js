const addEventListener = (events) => {
  const eventNames = Object.keys(events);

  const addEvents = eventNames.map((event) => {
    window.addEventListener(event, events[event]);

    return { name: event, event: events[event] };
  });

  return addEvents;
};

const removeEventListener = (events) =>
  events.forEach(({ name, event }) => window.removeEventListener(name, event));

export { addEventListener, removeEventListener };
