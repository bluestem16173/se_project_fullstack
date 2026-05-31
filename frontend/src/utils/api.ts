// frontend/src/api.js (or wherever you make calls)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const fetchData = () => fetch(`${API_URL}/api/your-endpoint`);

type ClothingItemData = {
    name: string;
    weather: string;
    imageUrl: string;
};

export const handleServerResponse = (response: Response) => {
    return response.ok ? response.json() : Promise.reject(`Error: ${response.status}`);
};

export function request(url: string, options?: RequestInit) {
    return fetch(`${baseUrl}${url}`, options).then(handleServerResponse);
}

export const getItemList = () => {
    return request('/items', {
        headers: {
            'Content-Type': 'application/json',
        },
    });
  };

export const addItem = ({ name, weather, imageUrl }: ClothingItemData) => {
    return request('/items', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, weather, imageUrl }),
    });
};

export const deleteItem = (id: string | number) => {
    return request(`/items/${id}`, {
        method: 'DELETE',
    });
};