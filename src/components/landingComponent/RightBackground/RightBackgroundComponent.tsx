import "./RightBackgroundComponent.scss"
import leaf8 from "../../../images/leaf8.svg"
import leaf9 from "../../../images/leaf9.svg"
import leaf10 from "../../../images/leaf10.svg"
import leaf11 from "../../../images/leaf11.svg"
import leaf12 from "../../../images/leaf12.svg"
import leaf13 from "../../../images/leaf13.svg"
import leaf14 from "../../../images/leaf14.svg"
import leaf15 from "../../../images/leaf15.svg"




const RightBackgroundComponent = () => {
    return (
        <div className="right-background-component__wrapper">
            <img src={leaf8} alt="" className="leaf8"/>
            <img src={leaf9} alt="" className="leaf9"/>
            <img src={leaf11} alt="" className="leaf11"/>
            <img src={leaf10} alt="" className="leaf10"/>
            <img src={leaf12} alt="" className="leaf12"/>
            <img src={leaf13} alt="" className="leaf13"/>
            <img src={leaf15} alt="" className="leaf15"/>
            <img src={leaf14} alt="" className="leaf14"/>
        </div>
    )
}

export default RightBackgroundComponent