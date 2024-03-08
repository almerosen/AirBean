import "./ProfileOverlay.scss"
import logo from "../../images/profileOverlay-images/Group 6.svg"
import { useState } from "react"
import useAuthStore from "../../store/useAuthStore"

const ProfileOverlay = (props) => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [gdpr, setGdpr] = useState(false)
    const { setUser } = useAuthStore()

    // const [formData, setFormData] = useState({
    //     name: "",
    //     epost: "",
    //     gdpr: false,
    // })

    // const handleChange = (event) => {
    //     const { name, value, type, checked } = event.target
    //     setFormData((prevFormData) => ({
    //         ...prevFormData,
    //         [name]: type === "checkbox" ? checked : value
    //     }))
    // }



    const handleSubmit = (event) => {
        event.preventDefault()
        props.toggleOverlay()


        const signUp = async () => {
            const signUpData = {
                username: username,
                password: email,
            }
            console.log(signUpData)

            try {
                const response = await fetch("https://airbean-api-xjlcn.ondigitalocean.app/api/user/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(signUpData),
                })
                if (!response.ok) {
                    throw new Error (`Failed fetch data with status ${response.status}`)
                } else {
                    const data = await response.json()
                    console.log(data)

                    // if (data.success) {
                        const loginData = {
                            username: signUpData.username,
                            password: signUpData.password
                        }

                        const responseLogin = await fetch("https://airbean-api-xjlcn.ondigitalocean.app/api/user/login", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(loginData)
                        })
                        if(!responseLogin.ok) {
                            throw new Error (`Failed fetch data with status ${responseLogin.status}`)
                        } else {
                            const token = await responseLogin.json()
                            console.log(token)

                            sessionStorage.setItem("token", token.token)
                            setUser(signUpData)
                        }
                    // }
                }
            } catch (error) {
                console.error (error)
            }
        }
        signUp()
    }

    return (
        <div className="overlay">
            <div className="header-container">
                <img src={logo} alt="" />
                <h1>Välkommen till AirBean-familjen!</h1>
                <p>Genom att skapa ett konto nedan kan du spara och se din orderhistorik.</p>
            </div>

            <form onSubmit={handleSubmit}>
                <label htmlFor="">Name</label>
                <input 
                    type="text"
                    name="name"
                    className="inputfield"
                    placeholder="name"
                    onChange={(event) => setUsername(event.target.value)}
                />
                <label htmlFor="">Epost</label>
                <input 
                    type="text"
                    name="epost"
                    className="inputfield"
                    placeholder="sixten.kaffelover@zocom.se"
                    onChange={(event) => setEmail(event.target.value)}

                />
                <div className="radio-button-container">
                    <input 
                        type="radio"
                        name="gdpr"
                        className="radio-button"
                        onChange={(event) => setGdpr(event.target.checked)}

                    />
                    <label htmlFor="">GDPR Ok!</label>
                </div>
                
                <div className="overlay__button-container">
                    <button className="overlay__button">Brew me a cup!
                    </button>
                </div>

            </form>

        </div>
    )
}

export default ProfileOverlay