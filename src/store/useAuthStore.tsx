import { create } from "zustand";

const useAuthStore = create((set) => ({
    isLoggedIn: false,
    username: null,
    email: null,
    login: (registerData) => set({
        isLoggedIn: true,
        username: registerData.username,
        email: registerData.email
    }),
    logout: () => set({
        isLoggedIn: false,
        username: null,
        email: null
    })
    // setUser: (userData) => set({ user: userData }),
}))

export default useAuthStore