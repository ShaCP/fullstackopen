const { HttpErrorResponse, HttpSuccessResponse } = require("../helpers/Responses");

class DataController {
  #data;

  constructor(data) {
    this.#data = data;
  }

  get data() {
    return this.#data;
  }

  set data(data) {
    this.#data = data;
  }    

  /* CRUD */

  /* inject httpError and httpSuccess */
  constructor(data, httpError, httpSuccess) {
    this.data = data;
    this.httpError = httpError;
    this.httpSuccess = httpSuccess;
  }

  getAll = (request, response) => {
    return ok(response, this.data);
  };

  getById = (request, response) => {
    const id = Number(request.params.id);
    const item = this.data.find((item) => item.id === id);

    if (item) {
      return ok(response, item);
    }

    return notFound(response);
  };

  deleteById = (request, response) => {
    const id = Number(request.params.id);
    this.data = this.data.filter((item) => item.id !== id);

    return noContent(response);
  };

  add = (request, response) => {
    const item = request.body;
    //   const id = Math.max(...data.map((item) => item.id)) + 1;

    const { generatedId: id } = request.middlewareData;
    return created(response, { ...item, id });
  };
}

module.exports = DataController;
