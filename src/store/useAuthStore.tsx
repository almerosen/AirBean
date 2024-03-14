import { create } from "zustand";

interface AuthStore {
    isLoggedIn: boolean
    username: string | null
    email: string | null
    login: (registerData: {username: string, email: string}) => void
    logout: () => void
}

const useAuthStore = create<AuthStore>((set) => ({
    isLoggedIn: false,
    username: null,
    email: null,
    login: (registerData) => set({
        isLoggedIn: true,
        username: registerData.username,
        email: registerData.email
    }),
    logout: () => {
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("cart")
        set({
        isLoggedIn: false,
        username: null,
        email: null
    })}
    // setUser: (userData) => set({ user: userData }),
}))

export default useAuthStore