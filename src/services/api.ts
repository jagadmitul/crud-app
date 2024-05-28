import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

export const fetchItems = async (page: number, limit: number) => {
    const response = await axios.get(`${API_URL}?_page=${page}&_limit=${limit}`);
    return response.data;
};

export const addItem = async (item: any) => {
    const response = await axios.post(API_URL, item);
    return response.data;
};

export const updateItem = async (id: number, item: any) => {
    const response = await axios.put(`${API_URL}/${id}`, item);
    return response.data;
};

export const deleteItem = async (id: number) => {
    await axios.delete(`${API_URL}/${id}`);
};
