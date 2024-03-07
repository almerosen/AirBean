import { useState } from "react"
import Header from "../../components/Header/Header"
import OrderHistory from "../../components/OrderHistory/OrderHistory"
import profileImage from "../../images/profile-images/Profile.svg"
import "./Profile.scss"
import ProfileOverlay from "../../components/profileOverlay/ProfileOverlay"

const Profile = () => {
    const [overlay, setOverlay] = useState(true)

    const toggleOverlay = () => {
        setOverlay(prevState => !prevState)
    }

    return (
        <div className="profile">
            {overlay && <ProfileOverlay 
                toggleOverlay={toggleOverlay}
            />}
            
            <Header />
            
            <div className="profile__user-details">
                <img src={profileImage} alt="profile-image" />
                <h1>Sixten Kaffelöver</h1>
                <p>sixten.kaffelöver@zocom.se</p>
            </div>
            <div className="profile__order-history">
                <h2>Orderhistorik</h2>
                <div className="orders-wrapper">
                    <div className="orders"><OrderHistory /></div>
                    <div className="orders"><OrderHistory /></div>
                    <div className="orders"><OrderHistory /></div>

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