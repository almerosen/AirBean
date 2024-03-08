import { useEffect, useState } from "react"
import Header from "../../components/Header/Header"
import OrderHistory from "../../components/OrderHistory/OrderHistory"
import profileImage from "../../images/profile-images/Profile.svg"
import "./Profile.scss"
import ProfileOverlay from "../../components/profileOverlay/ProfileOverlay"
import useAuthStore from "../../store/useAuthStore"
import useOrderStore from "../../store/orderStore"


const Profile = () => {
    const [overlay, setOverlay] = useState(true)
    const { user } = useAuthStore()

    
    const toggleOverlay = () => {
        setOverlay(prevState => !prevState)
    }

    
    const { orderNumber } = useOrderStore()
    const [orderHistory, setOrderHistory] = useState([])

    // Bör kanske vara i Profile filen istället...
    useEffect(() => {
        if (!orderNumber) {
            return
        }
        const getOrderHistory = async () => {
            const token = sessionStorage.getItem("token")
        
            try {
                const response = await fetch("https://airbean-api-xjlcn.ondigitalocean.app/api/user/history", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                })
                if (!response.ok) {
                    throw new Error (`Failed fetch data with status ${response.status}`)
            } else {
                    const orderHistoryData = await response.json()
                    console.log(orderHistoryData)
                    setOrderHistory(orderHistoryData.orderHistory)
                }
            } catch (error) {
                console.error(error)
            } 
        }
        getOrderHistory()
    
    }, [orderNumber])



    return (
        <div className="profile">
            {user ? null : <ProfileOverlay 
                toggleOverlay={toggleOverlay}
            />}
            
            <Header />
            
            <div className="profile__user-details">
                <img src={profileImage} alt="profile-image" />
                <h1>{user ? user.username: "Sixten Kaffelövér"}</h1>
                <p>{user ? user.password : "sixten.kaffelöver@zocom.se"}</p>
            </div>
            <div className="profile__order-history">
                <h2>Orderhistorik</h2>
                <div className="orders-wrapper">
                    {orderHistory.map((orderItem, index) => (   
                        <div className="orders" key={index}>
                            <OrderHistory
                                orderNr={orderItem.orderNr}
                                orderDate={orderItem.orderDate}
                                total={orderItem.total}
                            />
                        </div>
                    ))}   
                    
                    
                </div>
                <div className="total-spent">
                    <p>Totalt spenderat</p>
                    <p>1669 kr</p>
                </div>
            </div>
        </div>
    )
}

export default Profile