import "./ProfileOverlay.scss"
import logo from "../../images/profileOverlay-images/Group 6.svg"
import { useState } from "react"

const ProfileOverlay = (props) => {

    const [formData, setFormData] = useState({
        name: "",
        epost: "",
        gdpr: false,
    })

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target
        const newValue = type === "checkbox" ? checked : value
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: newValue
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        alert(`Name: ${formData.name}, Email: ${formData.epost}, gdpr: ${formData.gdpr} `)
        props.toggleOverlay()
        console.log(formData)


        const signUp = async () => {
            const signUpData = {
                username: formData.name,
                password: formData.epost
            }

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

                    if (data.success) {
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
                        }
                    }
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
                    onChange={handleChange}
                />
                <label htmlFor="">Epost</label>
                <input 
                    type="text"
                    name="epost"
                    className="inputfield"
                    placeholder="sixten.kaffelover@zocom.se"
                    onChange={handleChange}

                />
                <div className="radio-button-container">
                    <input 
                        type="radio"
                        name="gdpr"
                        className="radio-button"
                        onChange={handleChange}

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