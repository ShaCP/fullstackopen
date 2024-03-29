import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => axios.get(baseUrl).then((response) => response.data);

const create = (newObj) =>
  axios.post(baseUrl, newObj).then((response) => response.data);

const update = (id, newObj) =>
  axios.put(`${baseUrl}/${id}`, newObj).then((response) => response.data);

const remove = (id) =>
  axios.remove(`${baseUrl}/${id}`).then((response) => response.data);

const personService = { getAll, create, update, remove };

export default personService;
