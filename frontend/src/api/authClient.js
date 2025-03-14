/* eslint-disable no-undef */
import axios from "axios";
const authClient = axios.create({
    baseURL:import.meta.env.VITE_AUTH_URL,
})

export default authClient;