import { useEffect, useState } from "react"
import Header from "../../components/Header/Header"
import OrderHistory from "../../components/OrderHistory/OrderHistory"
import profileImage from "../../images/profile-images/Profile.svg"
import logoutImage from "../../images/profile-images/logout.svg"
import "./Profile.scss"
import ProfileOverlay from "../../components/profileOverlay/ProfileOverlay"
import useAuthStore from "../../store/useAuthStore"
import useOrderStore from "../../store/orderStore"

interface OrderData {
    orderNr: string
    orderDate: string
    total: number
}



const Profile = () => {
    const [overlay, setOverlay] = useState(true)
    const { isLoggedIn, username, email, logout } = useAuthStore()

    
    const toggleOverlay = () => {
        setOverlay(prevState => !prevState)
    }

    
    // const { orderNumber } = useOrderStore()
    const [orderHistory, setOrderHistory] = useState<OrderData[]>([])
    const [ordersMessage, setOrdersMessage] = useState("")


    const getOrderHistory = async () => {
        const token = sessionStorage.getItem("token");

        try {
            const response = await fetch("https://airbean-api-xjlcn.ondigitalocean.app/api/user/history", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            if (!response.ok) {
                throw new Error (`Failed fetch data with status ${response.status}`);
            } else {
                const orderHistoryData = await response.json();
                console.log("Order History response:", orderHistoryData);

                if (orderHistoryData.success === true) {
                    setOrderHistory(orderHistoryData.orderHistory);
                } else {
                    setOrdersMessage(orderHistoryData.message)
                }
                
            }
        } catch (error) {
            console.error(error);
        } 
    };

    useEffect(() => {
        if (isLoggedIn) {
            getOrderHistory();
        }
    }, [isLoggedIn]); // lägga till orderHitstory?

    
    const totalSum = orderHistory.length > 0 ? orderHistory.reduce((acc, currentItem) => {
        return acc + currentItem.total
    }, 0) : 0


    return (
        <div className="profile">
            {isLoggedIn ? null : <ProfileOverlay />}        
            <Header />         
            <div className="profile__user-details">
                <img src={profileImage} alt="profile-image" />
                <h1>{isLoggedIn ? username : "Sixten Kaffelövér"}</h1>
                <p>{isLoggedIn ? email : "sixten.kaffelöver@zocom.se"}</p>
                <button className="profile__logout-button" onClick={logout}>
                    <img src={logoutImage} />
                </button>
            </div>
           
            {isLoggedIn && <div className="profile__order-history">
                <h2>Orderhistorik</h2>
                <div className="orders-wrapper">
                    {orderHistory.length > 0 && orderHistory.map((orderItem, index) => (   
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
                    {orderHistory.length > 0 ? (
                        <div className="total-spent">
                            <p>Totalt spenderat</p> 
                            <p>{totalSum} kr</p>
                        </div>                 
                    ) : (
                        <p>{ordersMessage}</p>
                    )}           
                </div>
            </div>}
        </div>
    )
}

export default Profile