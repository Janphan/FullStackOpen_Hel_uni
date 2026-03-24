import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_URL || '/api/persons';

const getAll = () => axios.get(baseUrl).then(response => response.data);

const create = newObject => axios.post(baseUrl, newObject).then(response => response.data);

const remove = id => axios.delete(`${baseUrl}/${id}`).then(response => response.data);

const update = (id, updatedObject) => axios.put(`${baseUrl}/${id}`, updatedObject).then(response => response.data);

export default { getAll, create, remove, update };
