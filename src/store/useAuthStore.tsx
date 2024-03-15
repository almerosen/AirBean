import { create } from "zustand";
import useCartStore from "./cartStore";

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
        set({
            isLoggedIn: false,
            username: null,
            email: null
        })

        useCartStore.getState().clearCart(); //Clear the cart upon logout just to be ably to login/create different user accounts without getting someone else's cart

    }
    // setUser: (userData) => set({ user: userData }),
}))

export default useAuthStore