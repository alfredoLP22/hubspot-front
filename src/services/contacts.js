import axiosInstance from "../api/axiosConfig";

// Ejemplo de llamada GET a la API
export const fetchData = async (endpoint) => {
  try {
    const response = await axiosInstance.get(endpoint);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching data");
  }
};

// Ejemplo de llamada POST a la API
export const postData = async (endpoint, data) => {
  try {
    const response = await axiosInstance.post(endpoint, data);
    return response.data; // Devuelve los datos de la API
  } catch (error) {
    throw new Error("Error posting data");
  }
};
