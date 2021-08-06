const cacheData = (data, url) => {
  const stringifiedData = JSON.stringify(data);
  localStorage.setItem(url, stringifiedData);
};

const getCachedData = (url) => {
  const cachedData = localStorage.getItem(url);
  const parsedData = JSON.parse(cachedData);
  return parsedData;
};

const isEmptyObj = (obj) => {
  return obj && !Object.keys(obj).length && obj.constructor === Object;
};

export { cacheData, getCachedData, isEmptyObj };
