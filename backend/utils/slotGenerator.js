function generateSlots(startTime, endTime, duration, date) {
  const slots = [];

  let current = new Date(`${date}T${startTime}`);
  const end = new Date(`${date}T${endTime}`);

  while (current < end) {
    let next = new Date(current);
    next.setMinutes(current.getMinutes() + duration);

    if (next <= end) {
      slots.push({
        start: new Date(current),
        end: new Date(next)
      });
    }

    current = next;
  }

  return slots;
}

module.exports = generateSlots;