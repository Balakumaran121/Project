import axios from "axios";
const apiClient = axios.create({
    baseURL:import.meta.env.VITE_API_URL
})
apiClient.interceptors.request.use((config)=>{
    const token = localStorage.getItem("token");
    if(token){
        config.headers.Authorization=`Bearer ${token}`
    }
    return config;
},(error)=>Promise.reject(error))

apiClient.interceptors.response.use((res)=>res,(err)=>{
    if(err.response && err.response.staus===401){
        alert("Session expired. Please log in again.");
        localStorage.removeItem("token")
        window.location.href = "/";
    }
})
export default apiClient