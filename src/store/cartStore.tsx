import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { ProductsProps } from "../components/products/Products";

export interface CartStore {
    cart: ProductsProps[]
    addToCart: (product: ProductsProps) => void
    getTotalQuantity: () => number
    getTotalPrice: () => number
    increaseQuantity: (id: string) => void
    decreaseQuantity: (id: string) => void
    clearCart: () => void
}

type CartItem = {
    id: string
    price: number
    quantity: number
}

const useCartStore = create( //funkar om jag tar bort CartStore...???
    persist(
        (set, get) => ({
            cart: [],
            addToCart: (product: CartItem) => {
                const existingProduct = get().cart.find((cartItem: CartItem) => cartItem.id === product.id)
                if (existingProduct) {
                    if(existingProduct.quantity > 0) {
                        existingProduct.quantity++
                    }
                    set({ cart: [...get().cart] })
                } else {
                    set({ cart: [...get().cart, { ...product, quantity: 1}] })
                }
            },

            getTotalPrice: () => {
                return get().cart.reduce((total: number, product: CartItem) => total + product.quantity * product.price, 0)
            },

            getTotalQuantity: () => {
                return get().cart.reduce((totalQuantity: number, product: CartItem) => totalQuantity + product.quantity, 0)
            },

            increaseQuantity: (id: string) => {
                set((state) => ({
                    cart: state.cart.map((item: CartItem) => 
                        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
                    )
                }))      
            },

            decreaseQuantity: (id: string) => {
                set((state) => {
                    const existingItem = state.cart.find((item) => item.id === id)
                    if (existingItem) {
                        if (existingItem.quantity === 1) {
                            return { cart: state.cart.filter((item) => item.id !== id) }
                        } else {
                            const updatedCart = state.cart.map((item) => item.id === id ? { ...item, quantity: item.quantity - 1 } : item)
                            return { cart: updatedCart }
                        }
                    }
                    return state
                })
            },

            clearCart: () => set({ cart: [] })
            
        }),
        {
            name: "cart:",
            storage: createJSONStorage(() => sessionStorage)
        },
    ),
)

export default useCartStore
