import "./SignInForm.scss"
import logo from "../../images/profileOverlay-images/Group 6.svg"
import { useState } from "react"
import useAuthStore from "../../store/useAuthStore"
import "./SignInForm.scss"

const SignInForm = (props) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [gdpr, setGdpr] = useState(false)
    const { login } = useAuthStore()


    const loginUser = async () => {

        const loginData = {
            username: username,
            email: email,
        }

        const userData = {
            username: username,
            password: password,
        }

        try {
            const response = await fetch("https://airbean-api-xjlcn.ondigitalocean.app/api/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData)
            })
            if (!response.ok) {
                throw new Error (`Failed to login - status ${response.status}`)
            } else {
                const loginResponse = await response.json()
                console.log("Login response:", loginResponse)

                if (loginResponse.success === false) {
                    alert(loginResponse.message)
                    throw new Error(loginResponse.message)
                } else {
                    login(loginData)
                    sessionStorage.setItem("token", loginResponse.token)
                }
            }
        } catch (error) {
            console.error("Error during login: ", error)
            throw new Error("Failed to login due to an error");
        }
    }


    const handleLogin = async (event) => {
        event.preventDefault()

        const loginData = {
            username: username,
            password: password,
            email: password,
        }
        console.log("Login data:", loginData)

       loginUser()
    }


    return (
        <div className="overlay">
            <div className="header-container">
                <img src={logo} alt="" />
                <h1>Välkommen tillbaka!</h1>
                <p>Här kan du logga in för att spara och se din orderhistorik.</p>
            </div>

            <form onSubmit={handleLogin}>
                <label htmlFor="username">Namn</label>
                <input 
                    id="username"
                    type="text"
                    name="name"
                    className="inputfield"
                    placeholder="namn"
                    onChange={(event) => setUsername(event.target.value)}
                />
                <label htmlFor="password">Lösenord</label>
                <input 
                    id="password"
                    type="text" //password
                    name="password"
                    className="inputfield"
                    placeholder="lösenord"
                    onChange={(event) => setPassword(event.target.value)}
                />
                <label htmlFor="email">Epost</label>
                <input 
                    id="email"
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
                    <button 
                        className={`overlay__button ${ !username || !password ? "disabled" : "" }`}
                        disabled={!username || !password}
                    >
                        Brew me a cup!
                    </button>
                </div>
            </form>
            <div className="login-register-container">
                <p>Vill du skapa ett nytt konto?</p>
                <button 
                    className="login-form-button"
                    onClick={props.toggleSignIn}
                >Registrera
                </button>
            </div>
        </div>
    )
}

export default SignInForm