import "./LandingComponent.scss"

type LandingComponentProps = {
    image: string
    title: string
    subtitle: string
}

const LandingComponent = (props: LandingComponentProps) => {
    return (
        <div className="main__container">
            <div className="logo__circle">
                <img src={props.image} alt="" />
            </div>
            <h1>{props.title}</h1>
            <h2>{props.subtitle}</h2>   
        </div>
    )
}

export default LandingComponent