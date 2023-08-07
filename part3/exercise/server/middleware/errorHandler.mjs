const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "Id format is invalid" });
  }

  // In all other error situations, the middleware passes the error forward to the default Express error handler.
  next(error);
};

export default errorHandler;
