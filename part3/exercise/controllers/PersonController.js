const DataController = require("./dataController");
const phonebook = require("../phonebook");

class PersonController extends DataController {
  constructor(data) {
    super(data);
  }
}

module.exports = new PersonController(phonebook);
