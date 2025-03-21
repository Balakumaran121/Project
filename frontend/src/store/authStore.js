import { create } from "zustand";
const useAuthStore = create((set) => ({
    token: localStorage.getItem("token") || null,
    error:"",
    setError:(message)=>{
        set({error:message});
        setTimeout(()=>{
            set({error:""})
        },2500)
    },
    login: (newToken,id) => {
        localStorage.setItem("token", newToken);
        localStorage.setItem("id",id );
        set({ token: newToken })
    },
    logout: () => {
        localStorage.removeItem("token"),
            set({ token: null })
    }
}))

export default useAuthStore