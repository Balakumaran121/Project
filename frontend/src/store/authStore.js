import { create } from "zustand";
const useAuthStore = create((set) => ({
    token: localStorage.getItem("token") || null,
    error: "",
    setError: (message) => {
        set({ error: message });
        setTimeout(() => {
            set({ error: "" })
        }, 10000)
    },
    login: (newToken) => {
        localStorage.setItem("token", newToken);
        set({ token: newToken })
    },
    logout: () => {
        localStorage.removeItem("token"),
            set({ token: null })
    }
}))

export default useAuthStore