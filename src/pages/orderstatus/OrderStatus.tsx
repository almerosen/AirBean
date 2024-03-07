import useOrderStore from "../../store/orderStore"
import { Navigate, useNavigate } from "react-router-dom"
import "./OrderStatus.scss"
import droneImage from "../../images/orderstatus-images/drone.svg"
import { useEffect, useState } from "react"

const OrderStatus = () => {
    const navigate = useNavigate()
    const { orderNumber, eta } = useOrderStore()
    const [newEta, setNewEta] = useState(0)
    const [message, setMessage] = useState("")
    console.log(orderNumber)

    
    useEffect(() => {
        if (orderNumber) {
            const fetchEtaAndMessage = async (orderNumber) => {
                try {
                    const response = await fetch(`https://airbean-api-xjlcn.ondigitalocean.app/api/beans/order/status/${orderNumber}`)
                    if (!response.ok) {
                        throw new Error (`Failed fetch data with status ${response.status}`)
                    } else {
                        const data = await response.json()
                        console.log(data)
                        setNewEta(data.eta)
                    }
                } catch (error) {
                    console.error(error)
                }  
            }
            fetchEtaAndMessage(orderNumber)
        } else {
            const fetchMessage = async () => {
                try {
                    const response = await fetch("https://airbean-api-xjlcn.ondigitalocean.app/api/beans/order/status/{orderNr}")
                    if (!response.ok) {
                        throw new Error (`Failed fetch data with status ${response.status}`)
                    } else {
                        const data = await response.json()
                        console.log(data)
                        setMessage(data.message)
                    }
                } catch (error) {
                    console.error(error)
                }
            }
            fetchMessage()
        }
    }, [orderNumber])

    return (
        <div className="orderstatus">
            {orderNumber && <p className="ordernumber__text">Ordernummer <span>#{orderNumber}</span></p>}
            <img src={droneImage} alt="drone-image" />
            <div className="eta-container">
            {orderNumber ? (
                    <>
                        <h1>Din beställning är på väg!</h1>
                        <p className="eta__text">
                            <span>{newEta ? newEta : eta}</span> minuter
                        </p>
                    </>
                ) : (
                    <h2>{message}</h2>
                )}

            </div>
            <div className="orderstatus__button" onClick={() => navigate("/menu")}>Ok, cool!</div>
        </div>

    )
}

export default OrderStatus