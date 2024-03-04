import "./LeftBackgroundComponent.scss"
import leaf1 from "../../../images/leaf1.svg"
import leaf2 from "../../../images/leaf2.svg"
import leaf3 from "../../../images/leaf3.svg"
import leaf4 from "../../../images/leaf4.svg"
import leaf5 from "../../../images/leaf5.svg"
import leaf6 from "../../../images/leaf6.svg"
import leaf7 from "../../../images/leaf7.svg"


const LeftBackgroundComponent = () => {
    return (
        <div className="LeftBackgroundComponent__wrapper">
            <img src={leaf1} alt="" className="leaf1"/>
            <img src={leaf2} alt="" className="leaf2"/>
            <img src={leaf3} alt="" className="leaf3"/>
            <img src={leaf4} alt="" className="leaf4"/>
            <img src={leaf5} alt="" className="leaf5"/>
            <img src={leaf6} alt="" className="leaf6"/>
            <img src={leaf7} alt="" className="leaf7"/>
        </div>
    )
}

export default LeftBackgroundComponent