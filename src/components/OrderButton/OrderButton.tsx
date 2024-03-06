import { useState } from "react"
import "./OrderButton.scss"
import useCartStore from "../../store/cartStore"
import useOrderStore from "../../store/orderStore"

const OrderButton = (props) => {

    const { cart } = useCartStore() // hämta order från zustand state
    const { orderNumber } = useOrderStore()
    console.log(cart)

    // const orderData = JSON.parse(sessionStorage.getItem("state")) //Hämta order från sessionStorage

    const sendOrder = async () => {
        try {

            const orderDetails = {
                details: {
                    order: cart.map(item => ({
                        name: item.title,
                        price: item.price
                    }))
                }
            }   

            const response = await fetch("https://airbean-api-xjlcn.ondigitalocean.app/api/beans/order/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
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
                    orderNumber: data.orderNr
                }))

                fetchMessage(orderNumber)
            }
        } catch (error) {
            console.error(error)
        }
    }

    console.log(orderNumber)

    const fetchMessage = async (orderNumber) => {
        try {
            const response = await fetch(`https://airbean-api-xjlcn.ondigitalocean.app/api/beans/order/status/${orderNumber}`)
            if (!response.ok) {
                throw new Error (`Failed fetch data with status ${response.status}`)
            } else {
                const message = await response.json()
                console.log(message)
            }
        } catch (error) {
            console.error(error)
        }
    }



    return (
        <button className="order-button" onClick={sendOrder}>{props.text}</button>
    )
}


export default OrderButton