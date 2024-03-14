import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface CartStore {
    cart: CartItem[]
    addToCart: (product: CartItem) => void
    getTotalQuantity: () => number
    getTotalPrice: () => number
    increaseQuantity: (id: string) => void
    decreaseQuantity: (id: string) => void
    clearCart: () => void
}

export type CartItem = {
    id: string
    title: string
    price: number
    totalPrice: number
    quantity: number
}

const useCartStore = create( 
    persist<CartStore>(
        (set, get) => ({
            cart: [],
            addToCart: (product: CartItem) => {
                const existingProduct = get().cart.find((cartItem: CartItem) => cartItem.id === product.id)
                if (existingProduct) {
                    if(existingProduct.quantity > 0) {
                        existingProduct.quantity++
                        existingProduct.totalPrice = existingProduct.price * existingProduct.quantity
                    }
                    set({ cart: [...get().cart] })
                } else {
                    set({ cart: [...get().cart, { ...product, quantity: 1, totalPrice: product.price}] })
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
                        item.id === id ? { ...item, quantity: item.quantity + 1, totalPrice: item.price * (item.quantity + 1) } : item
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
                            const updatedCart = state.cart.map((item) => item.id === id ? { ...item, quantity: item.quantity - 1, totalPrice: item.price * (item.quantity - 1) } : item)
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
