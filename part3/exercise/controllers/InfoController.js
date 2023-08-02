const phonebook = require("../data");

const getInfo = (request, response) => {
  const date = new Date();
  response.send(
    `<p>Phonebook has info for ${phonebook.length} people</p><p>${date}</p>`
  );
};

module.exports = { getInfo };
