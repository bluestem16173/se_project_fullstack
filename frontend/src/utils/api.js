const baseUrl = "http://localhost:3001";

export const handleServerResponse = (response) => {
  return response.ok
    ? response.json()
    : Promise.reject(`Error: ${response.status}`);
};

export function request(url, options) {
  return fetch(`${baseUrl}${url}`, options).then(handleServerResponse);
}

function getAuthHeaders(token) {
    return {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    };
  }

export const getItemList = () => {
  return request("/items", {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const addItem = ({ name, weather, imageUrl }, token) => {
    return request("/items", {
      method: "POST",
      headers: getAuthHeaders(token),
      body: JSON.stringify({ name, weather, imageUrl }),
    });
  };
export const deleteItem = (id, token) => {
  return request(`/items/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(token),
  });
};