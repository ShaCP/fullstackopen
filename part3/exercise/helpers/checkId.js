const isValidId = (id) => {
  return !isNaN(Number(id));
};

const checkId = (id) => {
  const _id = Number(id);

  if (!isValidId(_id)) {
    return false;
  }

  return true;
};

/* turn the above into a middleware */
const checkIdMiddleware = (request, response, next) => {
  const id = request.params.id;

  if (!checkId(id)) {
    return response.status(400).json({ error: "invalid id" });
  }

  next();
};

module.exports = checkId;
