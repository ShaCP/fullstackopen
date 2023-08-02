class BaseHttpResponse {
  constructor(response, body) {
    this.response = response;
    this.body = body;
  }

  static #HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
  };

  static get HTTP_STATUS() {
    return this.#HTTP_STATUS;
  }

  send = (status) => {
    if (this.body) {
      return this.response.status(status).json(this.body);
    }
    return this.response.status(status).end();
  };
}

class HttpErrorResponse extends BaseHttpResponse {
  constructor(response, status, body) {
    super(response, status, { error: body });
  }

  notFound = () => this.send(this.HTTP_STATUS.NOT_FOUND);

  badRequest = () => this.send(this.HTTP_STATUS.BAD_REQUEST);

  internalServerError = () => this.send(this.HTTP_STATUS.INTERNAL_SERVER_ERROR);
}

class HttpSuccessResponse extends BaseHttpResponse {
  constructor(response, status, body) {
    super(response, status, body);
  }

  ok = () => this.send(this.HTTP_STATUS.OK);

  created = () => this.send(this.HTTP_STATUS.CREATED);

  noContent = () => this.send(this.HTTP_STATUS.NO_CONTENT);
}

module.exports = {
  HttpErrorResponse,
  HttpSuccessResponse
};
