const isUniqueValue = (value, array) => {
  return array.every((item) => item !== value);
};

module.exports = isUniqueValue;
