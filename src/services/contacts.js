import axiosInstance from "../api/axiosConfig";

export const fetchData = async (endpoint) => {
  try {
    const response = await axiosInstance.get(endpoint);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching data");
  }
};

export const postData = async (data) => {
  try {
    const response = await axiosInstance.post("", data);
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 409) {
        console.error("Conflict error (409):", error.response.data);
      } else {
        console.error(`Error: ${error.response.status}`, error.response.data);
      }
    }
    throw error;
  }
};

export const getUserByEmail = async (email) => {
  try {
    const response = await axiosInstance.get(`/search?email=${email}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 409) {
        console.error("Conflict error (409):", error.response.data);
      } else {
        console.error(`Error: ${error.response.status}`, error.response.data);
      }
    }
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axiosInstance.delete(`/${id}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 409) {
        console.error("Conflict error (409):", error.response.data);
      } else {
        console.error(`Error: ${error.response.status}`, error.response.data);
      }
    }
    throw error;
  }
};

export const updateUser = async (id, data) => {
  try {
    const response = await axiosInstance.patch(`/${id}`, data);
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 409) {
        console.error("Conflict error (409):", error.response.data);
      } else {
        console.error(`Error: ${error.response.status}`, error.response.data);
      }
    }
    throw error;
  }
};
