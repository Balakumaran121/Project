import { create } from "zustand";
const useAuthStore = create((set) => ({
    token: localStorage.getItem("token") || null,
    error:"",
    userData:{},
    setError:(message)=>{
        set({error:message});
        setTimeout(()=>{
            set({error:""})
        },2500)
    },
    setUserData:(data)=>{
        set({userData:data})
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