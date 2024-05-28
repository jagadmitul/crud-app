import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';
const TOKEN = '';

export const fetchItems = async () => {
    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${TOKEN}`
        },
    };
    const response = await fetch(API_URL, options);
    const data = await response.json();
    return data.entry.map((item: any) => item.resource);
}

export const addItem = async (item: any) => {
    const response = await axios.post(API_URL, item);
    return response.data;
};

export const updateItem = async (id: number, item: any) => {
    const response = await axios.put(`${API_URL}/${id}`, item);
    return response.data;
};

export const deleteItem = async (id: number) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${TOKEN}`
        },
    });

    return response.json();
};
