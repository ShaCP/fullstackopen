const requestLogger = (request, response, next) => {
  console.log(
    "REQUEST:",
    "Method:",
    request.method,
    "--",
    "Path:",
    request.path,
    "--",
    "Body:",
    request.body
  );
  console.log("---");
  next();
};

export default requestLogger;
