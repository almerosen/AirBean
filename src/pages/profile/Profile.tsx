import Header from "../../components/Header/Header"
import OrderHistory from "../../components/OrderHistory/OrderHistory"
import profileImage from "../../images/profile-images/Profile.svg"
import "./Profile.scss"

const Profile = () => {
    return (
        <div className="profile">
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