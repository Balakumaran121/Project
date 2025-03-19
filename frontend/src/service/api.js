import authClient from '../api/authClient';
import apiClient from '../api/apiClient';

export const registerUser = async (userData) => {
    return await authClient.post(`/register`, userData)
}
export const loginUser = async (userData) => {
    const response = await authClient.post(`/login`, userData);
    if (response.data.token) {
        localStorage.setItem("token", response.data.token)
    }
    return response.data
}

export const getProtectedData = async () => {
    const token = localStorage.getItem("token")
    return await apiClient.get(`/protected`, {
        headers: { Authorization: `Bearer ${token}` }
    })
}
export const logoutUser = () => {
    localStorage.removeItem("token");
};

export const getTodos = async () => {
    const response = await apiClient.get()
    if (!response.data) throw new Error("Error Occured")
    return response.data;
}

export const getUsers = async ()=>{
    const  response = await authClient.get("/users")
    if(!response.data) throw new Error("Erro Occured")
    return response.data
}
export const deleteTodo = async (id) => {
    const response = await apiClient.delete(`/delete/${id}`)
    if (!response.data) throw new Error("Failed to Delete todo")

    return response.data;
}

export const editTodo = async ({ id, updatedFields }) => {
    const response = await apiClient.put(`/update/${id}`, updatedFields)
    if (!response.data) throw new Error("Failed to update")
    return response.data;
}

export const createTodo = async (newTodo) => {
    const response = await apiClient.post(`/create-todo`, newTodo)
    if (!response.data) throw new Error("Error occured")
    return response.data

}

export const getSingleTodos = async (id) => {
    const response = await apiClient.get(`/${id}`)
    if (!response.data) throw new Error("Error fetching todos.")
    return response.data
  }