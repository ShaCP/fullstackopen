const generateId = (existingIds) => {
  let id;

  if (existingIds.length === 0) {
    id = 1;
  }

  do {
    id = Math.floor(Math.random() * 1000000);
  } while (existingIds.find((xId) => xId === id));

  return id;
};

module.exports = generateId;