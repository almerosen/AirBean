import "./Navbar.scss"
import closeLogo from "../../images/navbar-images/Union.svg"
import { Link } from "react-router-dom"
import { MouseEventHandler } from "react"

interface NavBarProps {
    onClick: MouseEventHandler<HTMLButtonElement>
}

const Navbar = (props: NavBarProps) => {
    return (
        <div className="navbar-overlay">

       
        <nav className="navbar">
            <button className="close-button" onClick={props.onClick}>
                <img src={closeLogo} alt="" />
            </button>
            <ul>
                <li><Link to="/menu">Meny</Link></li>
                <div className="border"></div>
                <li><Link to="/about">Vårt kaffe</Link></li>
                <div className="border"></div>
                <li>Min profil</li>
                <div className="border"></div>
                <li>Orderstatus</li>
            </ul>
        </nav>
        </div>
    )
}

export default Navbar
