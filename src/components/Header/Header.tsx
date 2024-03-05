import "./Header.scss"
import headerBackground from "../../images/header-images/header.svg"
import rectangle from "../../images/header-images/rectangle.svg"
import bag from "../../images/header-images/bag.svg"
import { useState } from "react"
import Navbar from "../navbar/Navbar"
import Cart from "../cart/Cart"
import orderArrow from "../../images/cart-images/caret-up-fill.svg"
import useCartStore from "../../store/cartStore"

const Header = () => {
    const { getQuantity } = useCartStore()
    const [dropDown, setDropDown] = useState(false)
    const [cartDropDown, setCartDropDown] = useState(false)

    const toggleDropdown = () => {
        setDropDown(prevState => !prevState)
    }

    const toggleCartDropDown = () => {
        setCartDropDown(prevState => !prevState)
    }

    const isMenuPage = location.pathname === "/menu"

    return (
        <>
        {dropDown && <Navbar onClick={toggleDropdown}/>} 
        {cartDropDown && <Cart />}
        <header className="header">
            <button className="nav-icon" onClick={toggleDropdown}>
                    <img src={rectangle} alt="" className="rectangle"/>
                    <img src={rectangle} alt="" className="rectangle"/>
                    <img src={rectangle} alt="" className="rectangle"/>
            </button>

            {isMenuPage && <div className="cart-icon" onClick={toggleCartDropDown}>
                <img src={bag} alt="cart-icon" className="bag-icon"/>
                <div className="quantity-logo">{getQuantity()}</div>
                {cartDropDown && <img src={orderArrow} className="orderArrow"/>}
            </div>}
        </header>
        </>
    )
}

export default Header