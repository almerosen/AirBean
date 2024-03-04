import LandingComponent from "../../components/landingComponent/LandingComponent"
import { Link } from "react-router-dom"
import "./LandingPage.scss"
import logo from "../../images/Vector.svg"
import LeftBackgroundComponent from "../../components/landingComponent/LeftBackground/LeftBackgroundComponent"
import RightBackgroundComponent from "../../components/landingComponent/RightBackground/RightBackgroundComponent"


const LandingPage = () => {
  return (
    <div className="landing-page">
      <Link to="/menu">

        <div className="landing-page__background">
          <LeftBackgroundComponent />
          <RightBackgroundComponent />
        </div>

        <div className="title-container">
          <LandingComponent 
            image={logo}
            title="AIR BEAN"
            subtitle="DRONEDELIVERED COFFEE"    
          />
        </div>
      </Link>
        
    </div>
  )
}

export default LandingPage