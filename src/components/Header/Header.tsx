import "./Header.scss"
import headerBackground from "../../images/header-images/header.svg"
import rectangle from "../../images/header-images/rectangle.svg"
import bag from "../../images/header-images/bag.svg"
import { useState } from "react"
import Navbar from "../navbar/Navbar"

const Header = () => {
    const [dropDown, setDropDown] = useState(false)

    const toggleDropdown = () => {
        setDropDown(prevState => !prevState)
    }

    return (
        <>
        {dropDown && <Navbar onClick={toggleDropdown}/>} 
        <header className="header">
            <button className="nav-icon" onClick={toggleDropdown}>
                    <img src={rectangle} alt="" className="rectangle"/>
                    <img src={rectangle} alt="" className="rectangle"/>
                    <img src={rectangle} alt="" className="rectangle"/>
            </button>

            <div className="cart-icon">
                <img src={bag} alt="" className="bag-icon"/>
                <div className="quantity-logo">7</div>
            </div>
        </header>
        
        

        
        </>
    )
}

export default Header