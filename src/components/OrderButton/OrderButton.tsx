import { useState } from "react"
import "./OrderButton.scss"
import useCartStore from "../../store/cartStore"
import useOrderStore from "../../store/orderStore"
import { Navigate, useNavigate } from "react-router-dom"

type OrderButton = {
    text: string
}

const OrderButton = (props: OrderButton) => {
    const navigate = useNavigate()
    const { cart, clearCart } = useCartStore() // hämta order från zustand state
    const { orderNumber } = useOrderStore()
    console.log(cart)

    // const orderData = JSON.parse(sessionStorage.getItem("state")) //Hämta order från sessionStorage

    const sendOrder = async () => {
        try {

            if(cart.length === 0 ) {
                return
            }

            const token = sessionStorage.getItem("token")
            if (!token) {
                return
            }

            const orderDetails = {
                details: {
                    order: cart.map((item)=> ({
                        name: item.title,
                        price: item.price
                    }))
                }
            }   

            const response = await fetch("https://airbean-api-xjlcn.ondigitalocean.app/api/beans/order/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(orderDetails)
            })
            if (!response.ok) {
                throw new Error (`Failed fetch data with status ${response.status}`)
            } else {
                const data = await response.json()
                console.log(data)

                useOrderStore.setState((state) => ({
                    ...state,
                    orderNumber: data.orderNr,
                    eta: data.eta
                }))

                // fetchMessage(orderNumber) denna kod ska köras när man klickar på Orderstatus-länken
            }
        } catch (error) {
            console.error(error)
        }

        clearCart()

        navigate("/orderstatus")
    }

    console.log(orderNumber)

    // const fetchMessage = async (orderNumber) => {
    //     try {
    //         const response = await fetch(`https://airbean-api-xjlcn.ondigitalocean.app/api/beans/order/status/${orderNumber}`)
    //         if (!response.ok) {
    //             throw new Error (`Failed fetch data with status ${response.status}`)
    //         } else {
    //             const message = await response.json()
    //             console.log(message)
    //         }
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }



    return (
        <button className="order-button" onClick={sendOrder}>{props.text}</button>
    )
}


export default OrderButton